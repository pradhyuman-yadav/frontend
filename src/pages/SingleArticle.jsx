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
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const articles = await fetchSquidexArticles();
        const foundArticle = articles.find(art => art.id === id);

        if (!foundArticle) {
          throw new Error('Article not found');
        }

        // Process article using shared utility
        const processedArticle = processArticleData(foundArticle);

        setArticle(processedArticle);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(`Failed to load article: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="single-article-page">
        <p>Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="single-article-page">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="single-article-page">
        <p>Article not found.</p>
      </div>
    );
  }

  return (
    <div className="single-article-page">
      <button 
        className="back-button" 
        onClick={() => navigate('/articles')}
      >
        ← Back to Articles
      </button>
      
      <article className="article-display">
        {article.featuredImage && (
          <figure className="article-featured-image">
            <img src={article.featuredImage} alt={article.title} />
          </figure>
        )}

        <header className="article-header">
          <h1 className="article-title">{article.title}</h1>

          <div className="article-meta">
            {article.author && (
              <span className="article-author">By {article.author}</span>
            )}
            {article.publishDate && (
              <time className="article-date" dateTime={new Date(article.publishDate).toISOString()}>
                {new Date(article.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
            {article.readingTime && (
              <span className="article-reading-time">{article.readingTime} min read</span>
            )}
            {article.wordCount && (
              <span className="article-word-count">{article.wordCount.toLocaleString()} words</span>
            )}
          </div>

          {article.excerpt && (
            <p className="article-excerpt">{article.excerpt}</p>
          )}
        </header>

        <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />

        <footer className="article-footer">
          {article.tags && article.tags.length > 0 && (
            <div className="article-tags">
              <span className="tags-label">Tags:</span>
              {article.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          )}

          {article.lastModified && (
            <div className="article-last-updated">
              Last updated: {new Date(article.lastModified).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          )}
        </footer>
      </article>
    </div>
  );
};

export default SingleArticle;
