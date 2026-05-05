import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { processArticleData } from '../utils/richTextConverter';

const Articles = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);
        const { fetchSquidexArticles } = await import('../services/cmsService');
        const articles = await fetchSquidexArticles();
        setAllArticles(articles.map(a => processArticleData(a)));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="articles-page">
        <header className="page-header">
          <h1 className="page-title">Articles</h1>
        </header>
        <p className="state-msg">Loading articles…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="articles-page">
        <header className="page-header">
          <h1 className="page-title">Articles</h1>
        </header>
        <p className="state-msg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="articles-page">
      <header className="page-header">
        <h1 className="page-title">Articles</h1>
        <p className="page-subtitle">{allArticles.length} article{allArticles.length !== 1 ? 's' : ''}</p>
      </header>

      <div className="articles-list">
        {allArticles.map((article) => (
          <div
            key={article.id}
            className="article-card"
            onClick={() => navigate(`/article/${article.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <h3 className="article-card-title">{article.title}</h3>
            <div className="article-card-meta">
              {article.author && <span>By {article.author}</span>}
              {article.publishDate && (
                <time>{new Date(article.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              )}
              {article.readingTime && <span>{article.readingTime} min read</span>}
            </div>
            {article.excerpt && (
              <p className="article-card-excerpt">{article.excerpt}</p>
            )}
            {article.tags && article.tags.length > 0 && (
              <div className="article-card-tags">
                {article.tags.map((tag, i) => (
                  <span key={i} className="art-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
