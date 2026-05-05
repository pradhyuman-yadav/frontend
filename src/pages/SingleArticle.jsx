import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSquidexArticles } from '../services/cmsService';
import { processArticleData } from '../utils/richTextConverter';

const SingleArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const articles = await fetchSquidexArticles();
        if (cancelled) return;
        const found = articles.find(a => a.id === id);
        if (!found) throw new Error('Article not found');
        const processed = processArticleData(found);
        if (cancelled) return;
        setArticle(processed);
      } catch (err) {
        if (cancelled) return;
        setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchArticle();
    return () => { cancelled = true; };
  }, [id]);

  const BackBtn = () => (
    <button className="back-btn" onClick={() => navigate('/articles')}>
      ← Back to Articles
    </button>
  );

  if (loading) {
    return (
      <div className="single-article-page">
        <BackBtn />
        <p className="state-msg">Loading article…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="single-article-page">
        <BackBtn />
        <p className="state-msg">Error: {error}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="single-article-page">
        <BackBtn />
        <p className="state-msg">Article not found.</p>
      </div>
    );
  }

  return (
    <div className="single-article-page">
      <BackBtn />

      <article className="article-display">
        {article.featuredImage && (
          <figure className="article-featured-image">
            <img src={article.featuredImage} alt={article.title} />
          </figure>
        )}

        <header style={{ borderTop: 'var(--rule-thick) solid var(--ink)', paddingTop: '.75rem', marginBottom: '1.5rem' }}>
          <h1 className="art-title">{article.title}</h1>
          <div className="art-meta">
            {article.author && <span>By {article.author}</span>}
            {article.publishDate && (
              <time dateTime={new Date(article.publishDate).toISOString()}>
                {new Date(article.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            )}
            {article.readingTime && <span>{article.readingTime} min read</span>}
          </div>
          {article.excerpt && <p className="art-excerpt">{article.excerpt}</p>}
        </header>

        <div className="art-body article-content" dangerouslySetInnerHTML={{ __html: article.content }} />

        <footer style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
          {article.tags && article.tags.length > 0 && (
            <div className="article-card-tags">
              {article.tags.map((tag, i) => (
                <span key={i} className="art-tag">{tag}</span>
              ))}
            </div>
          )}
          {article.lastModified && (
            <p style={{ marginTop: '.75rem', fontSize: '.78rem', fontStyle: 'italic', opacity: '.65' }}>
              Last updated: {new Date(article.lastModified).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}
        </footer>
      </article>
    </div>
  );
};

export default SingleArticle;
