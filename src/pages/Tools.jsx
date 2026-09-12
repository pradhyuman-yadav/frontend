import React from 'react';
import { TOOLS as tools, PROJECTS as projects } from '../data/work';

const Tools = () => {
  
  const statusBadgeClass = (status) => {
    if (status === 'Live') return 'badge badge-live';
    if (status === 'In Development') return 'badge badge-dev';
    return 'badge badge-done';
  };

  return (
    <div className="tools-page">
      <header className="page-header">
        <h1 className="page-title">Tools &amp; Projects</h1>
        <p className="page-subtitle">
          Tools are utilities I've built; projects are complete applications and systems.
        </p>
      </header>

      <section className="tools-section">
        <h2 className="section-header">Tools</h2>
        <div className="tools-grid-simple">
          {tools.map((tool) => (
            <a key={tool.id} href={tool.liveLink} className="tool-card-simple">
              <h3 className="tool-name-simple">{tool.name}</h3>
            </a>
          ))}
        </div>
      </section>

      <section className="projects-section" style={{ marginTop: '2rem' }}>
        <h2 className="section-header">Projects</h2>
        <div className="projects-list">
          {projects.map((project) => (
            <div key={project.id} className="project-row">
              <div className="proj-header">
                <span className="proj-name">{project.name}</span>
                <span className={statusBadgeClass(project.status)}>{project.status}</span>
                <span className="badge-cat">{project.category}</span>
                <span className="proj-period">
                  {project.startDate}{project.endDate ? ` – ${project.endDate}` : ' onwards'}
                </span>
              </div>
              <p className="proj-desc">{project.description}</p>
              <div className="exp-techs">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="exp-tech">{tech}</span>
                ))}
              </div>
              {(project.githubLink || project.liveLink) && (
                <div style={{ marginTop: '.6rem', display: 'flex', gap: '1rem' }}>
                  {project.githubLink && (
                    <a href={project.githubLink} className="profile-contact" target="_blank" rel="noopener noreferrer">
                      GitHub →
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} className="profile-contact" target="_blank" rel="noopener noreferrer">
                      Live →
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Tools;
