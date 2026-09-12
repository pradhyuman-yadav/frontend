import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InfrastructureSVG from '../components/InfrastructureSVG';
import { fetchSquidexArticles } from '../services/cmsService';
import { processArticleData } from '../utils/richTextConverter';
import { useReveal } from '../hooks/useReveal';
import { NOW, FEATURED_PROJECTS, CATEGORIES, PROJECTS } from '../data/work';

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

// Oldest project year, so the range statement stays true as the list grows.
const FIRST_YEAR = PROJECTS.map((p) => Number(p.startDate.slice(-4)))
  .filter(Boolean)
  .sort()[0];

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
      <section className="hero hero-solo">
        <h1 className="hero-title">
          I build things, run them myself, and <em>write</em> about what breaks.
        </h1>
        <p className="hero-lede">
          Engineer working across infrastructure, machine learning, and the front end. I have
          been shipping projects since {FIRST_YEAR} and hosting all of it on my own hardware.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary btn-lg" to="/tools">
            See the Work
          </Link>
          <Link className="btn btn-lg" to="/about">
            About Me
          </Link>
        </div>
      </section>

      {/* Now — present tense. */}
      <section className="reveal">
        <div className="section-head">
          <h2 className="section-title">What I am doing now</h2>
          <Link className="section-link" to="/pipeline">
            The stack →
          </Link>
        </div>

        <div className="now-list">
          {NOW.map((item) => (
            <Link key={item.to} to={item.to} className="now-row">
              <h3 className="now-row-title">{item.title}</h3>
              <p className="now-row-desc">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Built — past tense, the range. Bento: 4 cells for 4 projects. */}
      <section className="reveal">
        <div className="section-head">
          <h2 className="section-title">What I have built</h2>
          <Link className="section-link" to="/tools">
            All {PROJECTS.length} projects →
          </Link>
        </div>

        <p className="section-lede">
          {PROJECTS.length} projects across {CATEGORIES.length} fields — a motion-capture suit
          wired from sensors up, computer vision and deep-learning models, a trading pipeline, and
          a good deal of the web in between.
        </p>

        <div className="work-grid">
          {FEATURED_PROJECTS.map((project) => (
            <article key={project.id} className="work-card work-card-static">
              <div className="work-card-head">
                <h3 className="work-card-title">{project.name}</h3>
                <span className="work-card-year">
                  {project.endDate && project.endDate !== project.startDate
                    ? `${project.startDate} – ${project.endDate}`
                    : project.startDate}
                </span>
              </div>
              <p className="work-card-desc">{project.description}</p>
              <div className="work-card-tags">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="field-row">
          {CATEGORIES.map((category) => (
            <span key={category} className="field-chip">
              {category}
            </span>
          ))}
        </div>
      </section>

      {/* Writing — rows, a different layout family. */}
      <section className="reveal">
        <div className="section-head">
          <h2 className="section-title">Writing</h2>
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

      {/* Next — forward looking, ends on contact. */}
      <section className="next-panel reveal">
        <h2 className="section-title">What is next</h2>
        <p className="next-lede">
          More self-hosted infrastructure, more writing about the parts that are actually hard,
          and more small tools. If you are working on something in that territory, I would like
          to hear about it.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="mailto:pradhyuman999@gmail.com">
            Get in Touch
          </a>
          <a
            className="btn"
            href="https://github.com/pradhyuman-yadav"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
