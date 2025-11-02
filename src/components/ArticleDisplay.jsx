import React from 'react';

const ArticleDisplay = ({ article, loading, error }) => {
  if (loading) {
    return (
      <div className="article-loading">
        <p>Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="article-error">
        <p>Error loading article: {error}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-empty">
        <p>No article found.</p>
      </div>
    );
  }

  return (
    <article className="article-display">
      <header className="article-header">
        <h1 className="article-title">{article.title}</h1>
        <div className="article-meta">
          {article.author && (
            <span className="article-author">By {article.author}</span>
          )}
          {article.publishDate && (
            <time className="article-date">
              {new Date(article.publishDate).toLocaleDateString()}
            </time>
          )}
        </div>
        {article.excerpt && (
          <p className="article-excerpt">{article.excerpt}</p>
        )}
      </header>
      <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
      {article.tags && article.tags.length > 0 && (
        <footer className="article-footer">
          <div className="article-tags">
            <span className="tags-label">Tags:</span>
            {article.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </footer>
      )}
    </article>
  );
};

export default ArticleDisplay;
