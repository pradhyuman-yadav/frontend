import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { processArticleData } from '../utils/richTextConverter';

const Articles = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleArticleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  useEffect(() => {
    const fetchAllArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Import the fetch function from cmsService
        const { fetchSquidexArticles } = await import('../services/cmsService');
        const articles = await fetchSquidexArticles();

        // Process articles using shared utility
        const processedArticles = articles.map(article => processArticleData(article));

        setAllArticles(processedArticles);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(`Failed to load articles: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAllArticles();
  }, []);

  if (loading) {
    return (
      <div className="articles-page">
        <h2>All Articles</h2>
        <p>Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="articles-page">
        <h2>All Articles</h2>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="articles-page">
      <h2>All Articles</h2>
      <p>Found {allArticles.length} article{allArticles.length !== 1 ? 's' : ''}</p>
      
      <div className="articles-list">
        {allArticles.map((article) => (
          <article
            key={article.id}
            className="article-summary"
            onClick={() => handleArticleClick(article.id)}
          >
            {article.featuredImage && (
              <div className="article-summary-image">
                <img src={article.featuredImage} alt={article.title} />
              </div>
            )}

            <div className="article-summary-body">
              <header className="article-summary-header">
                <h3 className="article-summary-title">{article.title}</h3>
                <div className="article-summary-meta">
                  <span className="article-summary-author">By {article.author}</span>
                  <time className="article-summary-date">
                    {new Date(article.publishDate).toLocaleDateString()}
                  </time>
                  {article.readingTime && (
                    <span className="article-summary-reading-time">
                      {article.readingTime} min read
                    </span>
                  )}
                </div>
              </header>

              {article.excerpt && (
                <p className="article-summary-excerpt">{article.excerpt}</p>
              )}

              <div className="article-summary-content">
                <div dangerouslySetInnerHTML={{ __html: article.content.substring(0, 300) + '...' }} />
              </div>

              {article.tags && article.tags.length > 0 && (
                <div className="article-summary-tags">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Articles;
