import React from 'react';

const Tools = () => {
  const tools = [
    {
      id: "tool-1",
      name: "Git Commit Generator",
      liveLink: "/tools/git-commit-generator"
    },
    {
      id: "tool-2",
      name: "Code Formatter",
      liveLink: "/tools/code-formatter"
    },
    {
      id: "tool-3",
      name: "API Testing Tool",
      liveLink: "/tools/api-tester"
    },
    {
      id: "tool-4",
      name: "Regex Builder",
      liveLink: "/tools/regex-builder"
    },
    {
      id: "tool-5",
      name: "JSON Validator",
      liveLink: "/tools/json-validator"
    },
    {
      id: "tool-6",
      name: "Base64 Encoder/Decoder",
      liveLink: "/tools/base64-converter"
    },
    {
      id: "tool-7",
      name: "Color Palette Generator",
      liveLink: "/tools/color-palette"
    },
    {
      id: "tool-8",
      name: "Password Generator",
      liveLink: "/tools/password-generator"
    },
    {
      id: "tool-9",
      name: "2FA Code Generator",
      liveLink: "/tools/2fa-generator"
    },
    {
      id: "tool-10",
      name: "QR Code Generator",
      liveLink: "/tools/qr-generator"
    },
    {
      id: "tool-11",
      name: "Portrait Processor",
      liveLink: "/tools/portrait-processor"
    }
  ];

  const projects = [
    {
      id: "project-A",
      name: "Platform",
      description: "My platform showcasing projects, skills, and experience.",
      category: "Web Development",
      status: "Live",
      technologies: ["React", "Vite", "Tailwind CSS", "Docker", "Jenkins"],
      githubLink: "https://thepk.in",
      liveLink: "https://thepk.in",
      startDate: "Jan 2025",
      endDate: "Present"
    },
    {
      id: "project-D",
      name: "Video Streaming Platform",
      description: "A full-stack platform for video uploading, processing, and streaming, with user management.",
      category: "Web Development",
      status: "Completed",
      technologies: ["Next.js", "AWS", "Docker"],
      githubLink: "https://github.com/pradhyuman-yadav/shadowveil",
      liveLink: "",
      startDate: "Oct 2024"
    },
    {
      id: "project-B",
      name: "JobMatch Automator",
      description: "Automated job application data collection from multiple job boards, streamlining the job search.",
      category: "Automation",
      status: "Completed",
      technologies: ["Python", "Selenium", "Discord Webhooks"],
      githubLink: "",
      liveLink: "",
      startDate: "Jun 2024",
      endDate: "Jul 2024"
    },
    {
      id: "project-C",
      name: "Trading with ML",
      description: "An ML-powered trading platform using real-time data and optimized pipelines for trading strategies.",
      category: "Machine Learning",
      status: "Completed",
      technologies: ["Python", "Backtrader", "Machine Learning Libraries"],
      githubLink: "https://github.com/pradhyuman-yadav/trading-script",
      liveLink: "",
      startDate: "Dec 2024",
      endDate: "Jan 2025"
    },
    {
      id: "project-E",
      name: "AI Roommate Assistant",
      description: "An AI assistant to help with roommate tasks.",
      category: "AI/ML",
      status: "Completed",
      technologies: ["Python", "Some AI Library"],
      githubLink: "",
      liveLink: "",
      startDate: "Sep 2023"
    },
    {
      id: "project-G",
      name: "AI Instagram Model",
      description: "A project to generate images using AI.",
      category: "AI/ML",
      status: "Completed",
      technologies: ["Python", "Some Generative AI Library"],
      githubLink: "",
      liveLink: "",
      startDate: "Jan 2023",
      endDate: "Feb 2023"
    },
    {
      id: "project-J",
      name: "Custom Music Player",
      description: "A personal project to create a custom music player with a unique visual design. Built with ReactJS and ExpressJS, the application integrates Spotify and YT Music APIs to fetch songs and lyrics.",
      category: "Web Development",
      status: "Completed",
      technologies: ["ReactJS", "ExpressJS", "Spotify API", "YT Music API"],
      githubLink: "",
      liveLink: "",
      startDate: "May 2021",
      endDate: "Jun 2021"
    },
    {
      id: "project-H",
      name: "E-Commerce Platform for MIT",
      description: "Designed and developed a full-stack e-commerce website for Manipal Institute of Technology. The platform supports order placement, user management, and secure payment processing with Stripe. Firebase hosting and functions ensure cost-effective maintenance.",
      category: "Web Development",
      status: "Completed",
      technologies: ["ReactJS", "Material-UI", "ExpressJS", "Stripe", "Firebase"],
      githubLink: "",
      liveLink: "",
      startDate: "Apr 2021",
      endDate: "May 2021"
    },
    {
      id: "project-I",
      name: "Full Body Motion Capture Suit",
      description: "Developed a full-body motion capture suit using Arduino Mega and MPU9250 sensors. Integrated sensor data for real-time motion tracking, with ongoing enhancements for finger tracking and facial expression detection.",
      category: "Hardware/IoT",
      status: "Completed",
      technologies: ["Arduino", "C++", "MPU9250", "I2C Multiplexer"],
      githubLink: "",
      liveLink: "",
      startDate: "Mar 2021",
      endDate: "Mar 2022"
    },
    {
      id: "project-L",
      name: "Parkinson's Disease Detector",
      description: "A deep learning project to detect Parkinson's disease using a dataset from UCI. Implemented in Jupyter Notebook with an XGBoost classifier, and utilized popular Python libraries for data processing and model evaluation.",
      category: "Machine Learning",
      status: "Completed",
      technologies: ["Python", "Jupyter Notebook", "XGBoost", "NumPy", "pandas", "scikit-learn"],
      githubLink: "",
      liveLink: "",
      startDate: "Apr 2020",
      endDate: "May 2020"
    },
    {
      id: "project-F",
      name: "Wild Animal Detection",
      description: "A project to detect wild animals using computer vision.",
      category: "Computer Vision",
      status: "Completed",
      technologies: ["Python", "Computer Vision Library"],
      githubLink: "",
      liveLink: "",
      startDate: "Oct 2020"
    },
    {
      id: "project-K",
      name: "Fake Profile Detector",
      description: "An analytical tool to detect fake Instagram profiles using deep learning techniques. Leveraged Keras with TensorFlow for model building and Seaborn for data visualization to understand neural network behaviors.",
      category: "Machine Learning",
      status: "Completed",
      technologies: ["Python", "Keras", "TensorFlow", "Seaborn"],
      githubLink: "",
      liveLink: "",
      startDate: "Mar 2020",
      endDate: "Jul 2020"
    },
    {
      id: "project-M",
      name: "Color Detection Application",
      description: "An exploratory project in image processing that uses OpenCV to detect and analyze colors in images. This project helped solidify my understanding of Python libraries and image manipulation techniques.",
      category: "Computer Vision",
      status: "Completed",
      technologies: ["Python", "OpenCV", "NumPy", "pandas"],
      githubLink: "",
      liveLink: "",
      startDate: "Mar 2020",
      endDate: "Apr 2020"
    },
    {
      id: "project-N",
      name: "Newsletter Signup Website",
      description: "A straightforward newsletter signup website built with HTML, CSS, and NodeJS using the Express framework. Integrated MailChimp's API for handling subscriptions and hosted on Heroku for cost efficiency and minimal maintenance.",
      category: "Web Development",
      status: "Completed",
      technologies: ["HTML", "CSS", "NodeJS", "ExpressJS", "MailChimp API"],
      githubLink: "",
      liveLink: "",
      startDate: "Oct 2019",
      endDate: "Nov 2019"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live':
        return '#4CAF50'; // Green
      case 'Completed':
        return '#2196F3'; // Blue
      case 'In Development':
        return '#FF9800'; // Orange
      default:
        return '#9E9E9E'; // Gray
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Web Development':
        return '#E3F2FD';
      case 'Machine Learning':
        return '#F3E5F5';
      case 'AI/ML':
        return '#E8F5E8';
      case 'Computer Vision':
        return '#FFF3E0';
      case 'Automation':
        return '#FCE4EC';
      case 'Hardware/IoT':
        return '#F1F8E9';
      case 'Git & Version Control':
        return '#E8F5E8';
      case 'Code Quality':
        return '#E3F2FD';
      case 'API Development':
        return '#FFF3E0';
      case 'Text Processing':
        return '#F3E5F5';
      case 'Data Processing':
        return '#FCE4EC';
      case 'Data Encoding':
        return '#F1F8E9';
      case 'Design Tools':
        return '#E8F5E8';
      case 'Security':
        return '#FFEBEE';
      case 'Utilities':
        return '#E0F2F1';
      default:
        return '#F5F5F5';
    }
  };

  return (
    <div className="tools-page">
      <header className="page-header">
        <h1 className="page-title">Tools & Projects</h1>
        <p className="page-subtitle">
          A collection of tools I've built and projects I've worked on, spanning web development, 
          machine learning, AI, and hardware. Tools are utilities I've created, while projects 
          represent complete applications and systems.
        </p>
      </header>

          {/* Tools Section */}
          <section className="tools-section">
            <h2 className="section-title">Tools</h2>
            {tools.length > 0 ? (
              <div className="tools-grid-simple">
                {tools.map((tool) => (
                  <a 
                    key={tool.id} 
                    href={tool.liveLink}
                    className="tool-card-simple"
                  >
                    <h3 className="tool-name-simple">{tool.name}</h3>
                  </a>
                ))}
              </div>
            ) : (
              <div className="empty-section">
                <p>Tools will be added here soon. Check back later!</p>
              </div>
            )}
          </section>

      {/* Projects Section */}
      <section className="projects-section">
        <h2 className="section-title">Projects</h2>
        <div className="tools-grid">
          {projects.map((project) => (
            <div key={project.id} className="tool-card">
              <div className="tool-header">
                <h3 className="tool-name">{project.name}</h3>
                <div className="tool-status-container">
                  <span 
                    className="tool-status"
                    style={{ backgroundColor: getStatusColor(project.status) }}
                  >
                    {project.status}
                  </span>
                  <span 
                    className="tool-category-badge"
                    style={{ backgroundColor: getCategoryColor(project.category) }}
                  >
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="tool-timeline">
                <span className="timeline-label">Timeline:</span>
                <span className="timeline-value">
                  {project.startDate} {project.endDate ? `- ${project.endDate}` : 'onwards'}
                </span>
              </div>
              
              <p className="tool-description">{project.description}</p>
              
              <div className="tool-technologies">
                <span className="tech-label">Technologies:</span>
                <div className="tech-tags">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="tool-footer">
                <div className="tool-links">
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      className="tool-link github-link"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      GitHub →
                    </a>
                  )}
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      className="tool-link live-link"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="tools-footer">
        <div className="project-stats">
          <div className="stat-item">
            <span className="stat-number">{tools.length}</span>
            <span className="stat-label">Tools</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{projects.length}</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{projects.filter(p => p.status === 'Live').length}</span>
            <span className="stat-label">Live Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{projects.filter(p => p.status === 'Completed').length}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
        
        <p>
          <strong>Tools vs Projects:</strong> Tools are utilities and applications I've built to solve 
          specific problems or automate tasks. Projects are complete applications and systems that 
          demonstrate different aspects of my technical expertise.
        </p>
        <p>
          Interested in collaborating or learning more about any of these tools or projects? 
          Feel free to reach out through the contact information in my About Me page.
        </p>
      </div>
    </div>
  );
};

export default Tools;
