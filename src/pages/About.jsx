import React from 'react';

const About = () => {
  const skills = [
    { category: "Languages", items: ["Java", "JavaScript", "TypeScript", "Python", "SQL", "Bash"] },
    { category: "Frameworks", items: ["Spring Boot", "React", "Next.js", "Node.js", "JUnit", "Redux"] },
    { category: "Databases & Storage", items: ["PostgreSQL", "MySQL", "MongoDB", "RDBMS", "NoSQL", "Kafka", "RabbitMQ"] },
    { category: "Tools & Others", items: ["AWS", "Version Control (GIT)", "Microservices", "CI/CD", "Automated testing"] },
    { category: "AI Tools", items: ["GitHub Co-Pilot", "Windsurf", "Cursor", "Prompt Engineering", "Embedding Generation", "Embedding Optimization"] },
    { category: "Soft Skills", items: ["Adaptability", "Teamwork", "Communication", "Debugging", "Problem-Solving", "System Design", "Agile development"] }
  ];

  const experience = [
    {
      title: "Software Engineer Intern",
      company: "Colaberry",
      period: "July 2025 – Present",
      location: "San Jose, CA",
      description: "Working on securing AI platform and implementing authentication systems.",
      achievements: [
        "Secured 10K+ user AI platform by architecting JWT authentication & role-based authorization system using Java, reducing unauthorized access by 95%",
        "Integrated OAuth 2.0 with third-party services, enabling seamless SSO for 5K+ users & reducing onboarding time by 60%",
        "Reduced security incidents by 40% through implementing real-time monitoring system with automated threat detection & audit logging",
        "Improved deployment efficiency by 50% through creating Docker & Kubernetes containerized microservices architecture, supporting 100+ daily deployments"
      ]
    },
    {
      title: "Software Engineer",
      company: "Optum",
      period: "July 2022 - August 2023",
      location: "Remote",
      description: "Developed high-performance data pipelines and microservices architecture.",
      achievements: [
        "Increased processing throughput by 35% by engineering real-time, low-latency data pipeline using Spring Boot Kafka Hibernate MySQL",
        "Identified and resolved production performance bottlenecks, improving application stability for 10+ critical services",
        "Reduced microservice startup time by 70% and memory footprint by 50% by co-leading POC for new internal deployment platform with Quarkus",
        "Reduced application startup time by 40% by migrating backend services from Spring Boot to Quarkus, lowering resource consumption"
      ]
    },
    {
      title: "Software Engineer",
      company: "Defense Research and Development Organisation (DRDO)",
      period: "January 2022 - May 2022",
      location: "Remote",
      description: "Developed secure applications and implemented security protocols for classified information.",
      achievements: [
        "Developed secure Client Server applications in Python with encrypted protocols, ensuring mission-critical data integrity",
        "Enhanced security by 80% through implementing MFA & secure data pipelines handling classified information",
        "Improved threat detection efficiency by 50% through monitoring tools, preventing 200+ unauthorized access attempts"
      ]
    }
  ];

  const projects = [
    {
      name: "Self-Hosted Scalable Web Platform",
      description: "Engineered full-stack web platform (Next.js, Python) with productivity tools which is used by 50k+ users. Integrated and deployed AI services (healthcare symptom analyzer, legal AI assistant) using fine-tuned open-source models. Automated deployment lifecycle with CI/CD pipeline (GitHub Actions, Jenkins, Docker) to 24/7 self-hosted mini-PC.",
      technologies: ["Next.js", "Python", "AI Services", "GitHub Actions", "Jenkins", "Docker"],
      link: "https://thepk.in",
      date: "May 2025"
    },
    {
      name: "AI-Driven Market Prediction System",
      description: "Architected autonomous Python trading system leveraging AI Agent for real-time data analysis (RabbitMQ) and market decisions. Developed core compute engine to prompt AI Agent with aggregated data for market predictions and autonomous execution via brokerage APIs. Built interactive frontend providing observability into AI's logic, allowing users to trace data points and review LLM reasoning.",
      technologies: ["Python", "AI Agent", "RabbitMQ", "Brokerage APIs", "LLM"],
      link: "#",
      date: "April 2025",
      accuracy: "85% Accuracy"
    }
  ];

  const education = [
    {
      degree: "Master of Science",
      field: "Computer Science",
      institution: "George Washington University",
      location: "Washington DC, DC",
      year: "Graduation Date: May 2025",
      gpa: "GPA: 3.8",
      description: "Relevant Coursework: Data Structures, Algorithms, Object-Oriented Design, Cloud Computing, Computer Architecture, Machine Learning."
    }
  ];

  const leadership = [
    {
      title: "Director of Professional Development",
      organization: "International Organisation for Software Developer",
      period: "April 2019 – October 2021",
      description: "Partner with 100+ professionals and recruiters in various firms and organizations, bringing out 10+ companies including Deloitte, KPMG, Microsoft, Meta and Amazon's for our Professional Networking event with 150+ attendees."
    }
  ];

  return (
    <div className="about-page">
      <header className="page-header">
        <h1 className="page-title">Pradhyuman Yadav</h1>
        <div className="contact-header">
          <p className="location">San Jose, CA (open to relocate)</p>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/pradhyuman-yadav" target="_blank" rel="noopener noreferrer" className="contact-link">
              LinkedIn
            </a>
            <a href="tel:571-259-4892" className="contact-link">
              571-259-4892
            </a>
            <a href="mailto:pradhyuman680@gmail.com" className="contact-link">
              pradhyuman680@gmail.com
            </a>
            <a href="https://thepk.in" target="_blank" rel="noopener noreferrer" className="contact-link">
              Portfolio (thepk.in)
            </a>
          </div>
        </div>
      </header>

      <section className="about-section">
        <h2 className="section-title">Professional Summary</h2>
        <div className="summary-content">
          <p>
            Software Engineer with expertise in full-stack development, AI/ML, and microservices architecture. 
            Currently pursuing MS in Computer Science at George Washington University with a 3.8 GPA. 
            Proven track record of improving system performance, security, and scalability across multiple industries.
          </p>
          <p>
            Experienced in building scalable web platforms serving 50K+ users and developing AI-driven systems 
            with 85% accuracy. Passionate about leveraging technology to solve complex problems and drive innovation.
          </p>
        </div>
      </section>

      <section className="about-section">
        <h2 className="section-title">Education</h2>
        <div className="education-list">
          {education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="education-header">
                <h3 className="degree">{edu.degree} in {edu.field}</h3>
                <div className="education-meta">
                  <span className="institution">{edu.institution}</span>
                  <span className="location">{edu.location}</span>
                </div>
                <div className="education-details">
                  <span className="gpa">{edu.gpa}</span>
                  <span className="year">{edu.year}</span>
                </div>
              </div>
              <p className="education-description">{edu.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="section-title">Work Experience</h2>
        <div className="experience-timeline">
          {experience.map((job, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h3 className="job-title">{job.title}</h3>
                <div className="job-meta">
                  <span className="company">{job.company}</span>
                  <span className="location">{job.location}</span>
                  <span className="period">{job.period}</span>
                </div>
              </div>
              <p className="job-description">{job.description}</p>
              <ul className="job-achievements">
                {job.achievements.map((achievement, achIndex) => (
                  <li key={achIndex}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h3 className="project-name">{project.name}</h3>
                <div className="project-meta">
                  <span className="project-date">{project.date}</span>
                  {project.accuracy && <span className="project-accuracy">{project.accuracy}</span>}
                </div>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                <span className="tech-label">Technologies:</span>
                <div className="tech-tags">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="project-footer">
                <a 
                  href={project.link} 
                  className="project-link"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="section-title">Leadership Experience</h2>
        <div className="leadership-list">
          {leadership.map((role, index) => (
            <div key={index} className="leadership-item">
              <div className="leadership-header">
                <h3 className="leadership-title">{role.title}</h3>
                <div className="leadership-meta">
                  <span className="organization">{role.organization}</span>
                  <span className="period">{role.period}</span>
                </div>
              </div>
              <p className="leadership-description">{role.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {skills.map((skillGroup, index) => (
            <div key={index} className="skill-category">
              <h3 className="skill-category-title">{skillGroup.category}</h3>
              <div className="skill-tags">
                {skillGroup.items.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;