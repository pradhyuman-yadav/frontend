import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InfrastructureSVG from '../components/InfrastructureSVG';
import { fetchSquidexArticles } from '../services/cmsService';
import { processArticleData } from '../utils/richTextConverter';
import { useReveal } from '../hooks/useReveal';

// The three project pages, surfaced here instead of crowding the top nav.
const PROJECTS = [
  {
    to: '/llm-chat',
    title: 'Self-hosted AI Chat',
    description:
      'A chat interface running against open-source models on my own hardware, with streaming responses and model switching.',
    tags: ['Ollama', 'Streaming', 'FastAPI'],
  },
  {
    to: '/pipeline',
    title: 'Infrastructure Pipeline',
    description: 'The services behind this site, and how traffic moves between them.',
    tags: ['Docker', 'Portainer'],
  },
  {
    to: '/dc-metro',
    title: 'DC Metro Board',
    description: 'Live arrivals for the Washington DC Metro, built as a standalone app.',
    tags: ['WMATA API', 'React'],
  },
];

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const revealRef = useReveal();

  useEffect(() => {
    let cancelled = false;

    fetchSquidexArticles()
      .then((items) => {
        if (cancelled) return;
        setArticles(items.slice(0, 4).map(processArticleData));
      })
      .catch(() => {
        // The home page still works without the CMS; the writing section
        // simply renders its empty state.
        if (!cancelled) setArticles([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="home-page" ref={revealRef}>
      {/* Hero — headline, lede, two CTAs. Nothing else. */}
      <section className="hero">
        <div>
          <h1 className="hero-title">
            I build for the web, and <em>write</em> about it.
          </h1>
          <p className="hero-lede">
            Engineer working across infrastructure, front-end, and everything that keeps a
            self-hosted platform running.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-lg" to="/articles">
              Read the Writing
            </Link>
            <Link className="btn btn-lg" to="/about">
              About Me
            </Link>
          </div>
        </div>

        <div className="hero-aside">
          {/* A zero-count stat reads as broken, so the posts tile only appears
              once there is something to count. */}
          {articles.length > 0 && (
            <div className="hero-stat">
              <span className="hero-stat-value">{articles.length}</span>
              <span className="hero-stat-label">Recent posts</span>
            </div>
          )}
          <div className="hero-stat">
            <span className="hero-stat-value">11</span>
            <span className="hero-stat-label">Tools built</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">8</span>
            <span className="hero-stat-label">Services hosted</span>
          </div>
        </div>
      </section>

      {/* Selected work — bento, exactly three cells for three projects. */}
      <section className="reveal">
        <div className="section-head">
          <h2 className="section-title">Selected work</h2>
          <Link className="section-link" to="/tools">
            All tools →
          </Link>
        </div>

        <div className="work-grid">
          {PROJECTS.map((project) => (
            <Link key={project.to} to={project.to} className="work-card">
              <h3 className="work-card-title">{project.title}</h3>
              <p className="work-card-desc">{project.description}</p>
              <div className="work-card-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Writing — rows, a different layout family from the grid above. */}
      <section className="reveal">
        <div className="section-head">
          <h2 className="section-title">Recent writing</h2>
          <Link className="section-link" to="/articles">
            All posts →
          </Link>
        </div>

        {loading ? (
          <div className="skeleton-stack" aria-hidden="true">
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line" />
          </div>
        ) : articles.length === 0 ? (
          <p className="state-msg">No posts published yet. Check back soon.</p>
        ) : (
          <div className="writing-list">
            {articles.map((article) => {
              const published = formatDate(article.publishDate);
              return (
                <Link key={article.id} to={`/article/${article.id}`} className="writing-row">
                  <div>
                    <div className="writing-row-title">{article.title}</div>
                    {article.excerpt && (
                      <p className="writing-row-excerpt">{article.excerpt}</p>
                    )}
                  </div>
                  {published && <time className="writing-row-date">{published}</time>}
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Infrastructure — full-width, a third layout family. */}
      <section className="infrastructure-showcase reveal">
        <div className="section-head">
          <h2 className="section-title">The stack behind it</h2>
          <Link className="section-link" to="/pipeline">
            Full pipeline →
          </Link>
        </div>

        <div className="infrastructure-diagram">
          <InfrastructureSVG />
        </div>
      </section>
    </div>
  );
};

export default Home;
