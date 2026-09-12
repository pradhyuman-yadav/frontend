import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchSquidexArticles } from '../services/cmsService';
import { processArticleData } from '../utils/richTextConverter';
import { useReveal } from '../hooks/useReveal';

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

const Articles = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const revealRef = useReveal();

  useEffect(() => {
    let cancelled = false;

    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);
        const articles = await fetchSquidexArticles();
        if (cancelled) return;
        setAllArticles(articles.map((a) => processArticleData(a)));
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="articles-page" ref={revealRef}>
      <header className="page-header">
        <h1 className="page-title">Writing</h1>
        <p className="page-subtitle">
          {loading
            ? 'Loading posts…'
            : `${allArticles.length} post${allArticles.length === 1 ? '' : 's'} on building, hosting, and shipping things.`}
        </p>
      </header>

      {error && (
        <div className="alert alert-error" role="alert">
          <span>Could not load posts. {error}</span>
        </div>
      )}

      {loading ? (
        <div className="skeleton-stack" aria-hidden="true">
          <div className="skeleton skeleton-card" />
          <div className="skeleton skeleton-card" />
          <div className="skeleton skeleton-card" />
        </div>
      ) : allArticles.length === 0 && !error ? (
        <p className="state-msg">No posts published yet. Check back soon.</p>
      ) : (
        <div className="articles-list">
          {allArticles.map((article, i) => {
            const published = formatDate(article.publishDate);
            return (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="article-card reveal"
                style={{ '--reveal-delay': `${Math.min(i, 6) * 60}ms` }}
              >
                <h2 className="article-card-title">{article.title}</h2>
                <div className="article-card-meta">
                  {article.author && <span>{article.author}</span>}
                  {published && <time>{published}</time>}
                  {article.readingTime > 0 && <span>{article.readingTime} min read</span>}
                </div>
                {article.excerpt && <p className="article-card-excerpt">{article.excerpt}</p>}
                {article.tags?.length > 0 && (
                  <div className="article-card-tags">
                    {article.tags.map((tag, t) => (
                      <span key={t} className="art-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Articles;
