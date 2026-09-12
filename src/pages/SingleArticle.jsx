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
    <button type="button" className="back-btn" onClick={() => navigate('/articles')}>
      ← Back to Writing
    </button>
  );

  // CMS dates are not guaranteed parseable; an invalid one must not take the
  // page down via toISOString().
  const publishedAt = article?.publishDate ? new Date(article.publishDate) : null;
  const publishedValid = publishedAt && !Number.isNaN(publishedAt.getTime());
  const updatedAt = article?.lastModified ? new Date(article.lastModified) : null;
  const updatedValid = updatedAt && !Number.isNaN(updatedAt.getTime());
  const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' };

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
            <img
              src={article.featuredImage}
              alt={article.title}
              width="1200"
              height="630"
              fetchPriority="high"
            />
          </figure>
        )}

        <header>
          <h1 className="art-title">{article.title}</h1>
          <div className="art-meta">
            {article.author && <span>{article.author}</span>}
            {publishedValid && (
              <time dateTime={publishedAt.toISOString()}>
                {publishedAt.toLocaleDateString(undefined, dateFormat)}
              </time>
            )}
            {article.readingTime > 0 && <span>{article.readingTime} min read</span>}
          </div>
          {article.excerpt && <p className="art-excerpt">{article.excerpt}</p>}
        </header>

        <div className="art-body article-content" dangerouslySetInnerHTML={{ __html: article.content }} />

        <footer className="article-footer">
          {article.tags && article.tags.length > 0 && (
            <div className="article-card-tags">
              {article.tags.map((tag, i) => (
                <span key={i} className="art-tag">{tag}</span>
              ))}
            </div>
          )}
          {updatedValid && (
            <p className="article-updated">
              Last updated {updatedAt.toLocaleDateString(undefined, dateFormat)}
            </p>
          )}
        </footer>
      </article>
    </div>
  );
};

export default SingleArticle;
