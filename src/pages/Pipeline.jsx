import React from 'react';

const Pipeline = () => {
  // Back wires SVG (static gray template) - Exact layout from flow.svg
  const backWiresSVG = `
    <svg viewBox="0 0 1636.18 2181.34" xmlns="http://www.w3.org/2000/svg">
      <defs>
      </defs>

      <!-- BACK WIRES - Static Gray Template (NO ARROWHEADS) -->

      <!-- Request Originator node (USER/Originator) -->
      <circle cx="881.49" cy="108.05" r="80" fill="none" stroke="#d5d5d5" stroke-width="2" />
      <text x="881.49" y="113" text-anchor="middle" font-size="26" font-weight="700" fill="#666" pointer-events="none">USER</text>
      <text x="881.49" y="136" text-anchor="middle" font-size="16" fill="#999" pointer-events="none">Originator</text>

      <!-- Originator to DNS (curved horizontal) -->
      <path d="M 961.49 108.05 Q 1150 100, 1343.12 89.53" fill="none" stroke-width="4" stroke="#d5d5d5" stroke-linecap="round" stroke-linejoin="round" />

      <!-- DNS/GoDaddy node -->
      <circle cx="1423.12" cy="89.53" r="80" fill="none" stroke="#d5d5d5" stroke-width="2" />
      <text x="1423.12" y="95" text-anchor="middle" font-size="26" font-weight="700" fill="#666" pointer-events="none">DNS</text>
      <text x="1423.12" y="118" text-anchor="middle" font-size="15" fill="#999" pointer-events="none">GoDaddy</text>

      <!-- Originator to Azure (downward) -->
      <path d="M 881.49 188.05 Q 881.49 320, 872.01 465.72" fill="none" stroke-width="4" stroke="#d5d5d5" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Azure Server node (SSL/Proxy) -->
      <circle cx="872.01" cy="545.72" r="80" fill="none" stroke="#d5d5d5" stroke-width="2" />
      <text x="872.01" y="550" text-anchor="middle" font-size="26" font-weight="700" fill="#666" pointer-events="none">Azure</text>
      <text x="872.01" y="573" text-anchor="middle" font-size="15" fill="#999" pointer-events="none">SSL/Proxy</text>

      <!-- Azure to Home Server (downward) -->
      <path d="M 872.01 625.72 Q 872.01 800, 870.10 919.70" fill="none" stroke-width="4" stroke="#d5d5d5" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Home Server node (hub) -->
      <circle cx="870.10" cy="999.70" r="80" fill="none" stroke="#d5d5d5" stroke-width="2" />
      <text x="870.10" y="1004" text-anchor="middle" font-size="26" font-weight="700" fill="#666" pointer-events="none">Home</text>
      <text x="870.10" y="1027" text-anchor="middle" font-size="15" fill="#999" pointer-events="none">Server</text>

      <!-- Service Rows from Home Server - Curved connections -->
      <!-- Service 1 (159.71, 1637.43) - Frontend -->
      <path d="M 790 1020 Q 150 1150, 159.71 1557.43" fill="none" stroke-width="4" stroke="#d5d5d5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Service 2 (352.72, 1637.43) - Backend -->
      <path d="M 800 1039 Q 370 1150, 352.72 1557.43" fill="none" stroke-width="4" stroke="#d5d5d5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Service 3 (550.23, 1641.03) - SLM/LLM -->
      <path d="M 815 1058 Q 550 1360, 550.23 1561.03" fill="none" stroke-width="4" stroke="#d5d5d5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Service 4 (636.81, 2032.45) - Portainer -->
      <path d="M 828 1070 Q 650 1500, 636.81 1952.45" fill="none" stroke-width="4" stroke="#d5d5d5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Service 5 (847.40, 2029.75) - Squidex -->
      <path d="M 870 1080 Q 870 1520, 847.40 1949.75" fill="none" stroke-width="4" stroke="#d5d5d5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Service 6 (1063.85, 2024.33) - n8n -->
      <path d="M 900 1075 Q 1050 1320, 1063.85 1944.33" fill="none" stroke-width="4" stroke="#d5d5d5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Service 7 (1272.19, 2024.33) - Dashboard -->
      <path d="M 930 1056 Q 1250 1200, 1272.19 1944.33" fill="none" stroke-width="4" stroke="#d5d5d5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Service 8 (1474.21, 2026.14) - Excalidraw -->
      <path d="M 948 1025 Q 1450 1150, 1474.21 1946.14" fill="none" stroke-width="4" stroke="#d5d5d5" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Service 1: Frontend - PUBLIC (159.71, 1637.43) -->
      <circle cx="159.71" cy="1637.43" r="80" fill="none" stroke="#d5d5d5" stroke-width="2" />
      <text x="159.71" y="1642" text-anchor="middle" font-size="26" font-weight="600" fill="#666" pointer-events="none">Frontend</text>
      <text x="159.71" y="1666" text-anchor="middle" font-size="13" fill="#999" pointer-events="none">React/Vite</text>

      <!-- Service 2: Backend - PRIVATE (352.72, 1637.43) -->
      <circle cx="352.72" cy="1637.43" r="80" fill="none" stroke="#d5d5d5" stroke-width="2" />
      <text x="352.72" y="1642" text-anchor="middle" font-size="26" font-weight="600" fill="#666" pointer-events="none">Backend</text>
      <text x="352.72" y="1666" text-anchor="middle" font-size="13" fill="#999" pointer-events="none">API</text>

      <!-- Service 3: SLM/LLM - PUBLIC (550.23, 1641.03) -->
      <circle cx="550.23" cy="1641.03" r="80" fill="none" stroke="#d5d5d5" stroke-width="2" />
      <text x="550.23" y="1646" text-anchor="middle" font-size="26" font-weight="600" fill="#666" pointer-events="none">SLM/LLM</text>
      <text x="550.23" y="1670" text-anchor="middle" font-size="13" fill="#999" pointer-events="none">MLOps</text>

      <!-- Service 4: Portainer - PRIVATE (636.81, 2032.45) -->
      <circle cx="636.81" cy="2032.45" r="80" fill="none" stroke="#d5d5d5" stroke-width="2" />
      <text x="636.81" y="2037" text-anchor="middle" font-size="26" font-weight="600" fill="#666" pointer-events="none">Portainer</text>
      <text x="636.81" y="2061" text-anchor="middle" font-size="13" fill="#999" pointer-events="none">Docker Mgmt</text>

      <!-- Service 5: Squidex - PRIVATE (847.40, 2029.75) -->
      <circle cx="847.40" cy="2029.75" r="80" fill="none" stroke="#d5d5d5" stroke-width="2" />
      <text x="847.40" y="2034" text-anchor="middle" font-size="26" font-weight="600" fill="#666" pointer-events="none">Squidex</text>
      <text x="847.40" y="2058" text-anchor="middle" font-size="13" fill="#999" pointer-events="none">CMS</text>

      <!-- Service 6: n8n - PRIVATE (1063.85, 2024.33) -->
      <circle cx="1063.85" cy="2024.33" r="80" fill="none" stroke="#d5d5d5" stroke-width="2" />
      <text x="1063.85" y="2027" text-anchor="middle" font-size="26" font-weight="600" fill="#666" pointer-events="none">N8N</text>
      <text x="1063.85" y="2058" text-anchor="middle" font-size="13" fill="#999" pointer-events="none">Automation</text>

      <!-- Service 7: Dashboard - PRIVATE (1272.19, 2024.33) -->
      <circle cx="1272.19" cy="2024.33" r="80" fill="none" stroke="#d5d5d5" stroke-width="2" />
      <text x="1272.19" y="2029" text-anchor="middle" font-size="26" font-weight="600" fill="#666" pointer-events="none">Dashboard</text>
      <text x="1272.19" y="2053" text-anchor="middle" font-size="13" fill="#999" pointer-events="none">Homer</text>

      <!-- Service 8: Excalidraw - PRIVATE (1474.21, 2026.14) -->
      <circle cx="1474.21" cy="2026.14" r="80" fill="none" stroke="#d5d5d5" stroke-width="2" />
      <text x="1474.21" y="2031" text-anchor="middle" font-size="26" font-weight="600" fill="#666" pointer-events="none">Excalidraw</text>
      <text x="1474.21" y="2055" text-anchor="middle" font-size="13" fill="#999" pointer-events="none">Diagrams</text>
    </svg>
  `;

  // Front wires SVG (animated colored with gradient mask - Exact layout from flow.svg)
  const frontWiresSVG = `
    <svg viewBox="0 0 1636.18 2181.34" xmlns="http://www.w3.org/2000/svg">
      <style>
        @keyframes slideMask {
          0% { y: -100%; }
          100% { y: 100%; }
        }
        .mask-rect {
          animation: slideMask 10s ease-in-out infinite;
        }
      </style>

      <defs>
        <!-- Vertical gradient mask for top-to-bottom spotlight effect -->
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="white" stop-opacity="0" />
          <stop offset="80%" stop-color="white" stop-opacity="1" />
          <stop offset="80%" stop-color="white" stop-opacity="0" />
        </linearGradient>

        <!-- Mask for animated wires -->
        <mask id="gradientMask">
          <rect class="mask-rect" width="100%" height="100%" fill="url(#gradient)" x="0" y="0" />
        </mask>
      </defs>

      <!-- FRONT WIRES - Animated Colored (Only on pipes and node outlines, NO ARROWHEADS) -->

      <!-- Originator to DNS (curved horizontal, animated) -->
      <path d="M 961.49 108.05 Q 1150 100, 1343.12 89.53" fill="none" stroke-width="4" stroke="#4CAF50" stroke-linecap="round" stroke-linejoin="round" mask="url(#gradientMask)" />

      <!-- DNS/GoDaddy node outline (animated) -->
      <circle cx="1423.12" cy="89.53" r="80" fill="none" stroke="#2196F3" stroke-width="2" mask="url(#gradientMask)" />

      <!-- Originator to Azure (downward, animated) -->
      <path d="M 881.49 188.05 Q 881.49 320, 872.01 465.72" fill="none" stroke-width="4" stroke="#FF9800" stroke-linecap="round" stroke-linejoin="round" mask="url(#gradientMask)" />

      <!-- Azure Server node outline (animated) -->
      <circle cx="872.01" cy="545.72" r="80" fill="none" stroke="#FF9800" stroke-width="2" mask="url(#gradientMask)" />

      <!-- Azure to Home Server (downward, animated) -->
      <path d="M 872.01 625.72 Q 872.01 800, 870.10 919.70" fill="none" stroke-width="4" stroke="#2196F3" stroke-linecap="round" stroke-linejoin="round" mask="url(#gradientMask)" />

      <!-- Home Server node outline (animated) -->
      <circle cx="870.10" cy="999.70" r="80" fill="none" stroke="#2196F3" stroke-width="2" mask="url(#gradientMask)" />

      <!-- Service Rows (animated) - Curved connections -->
      <!-- Pipe to Service 1 (Frontend) -->
      <path d="M 790 1020 Q 150 1150, 159.71 1557.43" fill="none" stroke-width="4" stroke="#E91E63" stroke-linecap="round" stroke-linejoin="round" mask="url(#gradientMask)" />
      <!-- Pipe to Service 2 (Backend) -->
      <path d="M 800 1039 Q 370 1150, 352.72 1557.43" fill="none" stroke-width="4" stroke="#9C27B0" stroke-linecap="round" stroke-linejoin="round" mask="url(#gradientMask)" />
      <!-- Pipe to Service 3 (SLM/LLM) -->
      <path d="M 815 1058 Q 550 1360, 550.23 1561.03" fill="none" stroke-width="4" stroke="#3F51B5" stroke-linecap="round" stroke-linejoin="round" mask="url(#gradientMask)" />
      <!-- Pipe to Service 4 (Portainer) -->
      <path d="M 828 1070 Q 650 1500, 636.81 1952.45" fill="none" stroke-width="4" stroke="#00BCD4" stroke-linecap="round" stroke-linejoin="round" mask="url(#gradientMask)" />
      <!-- Pipe to Service 5 (Squidex) -->
      <path d="M 870 1080 Q 870 1520, 847.40 1949.75" fill="none" stroke-width="4" stroke="#2196F3" stroke-linecap="round" stroke-linejoin="round" mask="url(#gradientMask)" />
      <!-- Pipe to Service 6 (n8n) -->
      <path d="M 900 1075 Q 1050 1320, 1063.85 1944.33" fill="none" stroke-width="4" stroke="#673AB7" stroke-linecap="round" stroke-linejoin="round" mask="url(#gradientMask)" />
      <!-- Pipe to Service 7 (Dashboard) -->
      <path d="M 930 1056 Q 1250 1200, 1272.19 1944.33" fill="none" stroke-width="4" stroke="#009688" stroke-linecap="round" stroke-linejoin="round" mask="url(#gradientMask)" />
      <!-- Pipe to Service 8 (Excalidraw) -->
      <path d="M 948 1025 Q 1450 1150, 1474.21 1946.14" fill="none" stroke-width="4" stroke="#4CAF50" stroke-linecap="round" stroke-linejoin="round" mask="url(#gradientMask)" />

      <!-- Service node outlines (animated) -->
      <!-- Frontend -->
      <circle cx="159.71" cy="1637.43" r="80" fill="none" stroke="#E91E63" stroke-width="2" mask="url(#gradientMask)" />
      <!-- Backend -->
      <circle cx="352.72" cy="1637.43" r="80" fill="none" stroke="#9C27B0" stroke-width="2" mask="url(#gradientMask)" />
      <!-- SLM/LLM -->
      <circle cx="550.23" cy="1641.03" r="80" fill="none" stroke="#3F51B5" stroke-width="2" mask="url(#gradientMask)" />
      <!-- Portainer -->
      <circle cx="636.81" cy="2032.45" r="80" fill="none" stroke="#00BCD4" stroke-width="2" mask="url(#gradientMask)" />
      <!-- Squidex -->
      <circle cx="847.40" cy="2029.75" r="80" fill="none" stroke="#2196F3" stroke-width="2" mask="url(#gradientMask)" />
      <!-- n8n -->
      <circle cx="1063.85" cy="2024.33" r="80" fill="none" stroke="#673AB7" stroke-width="2" mask="url(#gradientMask)" />
      <!-- Dashboard -->
      <circle cx="1272.19" cy="2024.33" r="80" fill="none" stroke="#009688" stroke-width="2" mask="url(#gradientMask)" />
      <!-- Excalidraw -->
      <circle cx="1474.21" cy="2026.14" r="80" fill="none" stroke="#4CAF50" stroke-width="2" mask="url(#gradientMask)" />
    </svg>
  `;

  return (
    <div className="pipeline-page">
      <header className="pipeline-header">
        <h1>Infrastructure Pipeline</h1>
        <p>Vertical data flow through my distributed platform • Showcasing DevOps & Hosting Architecture</p>
      </header>

      <div className="pipeline-content">
        {/* SVG Diagram - Vertical Flow with Animated Wires */}
        <div className="pipeline-diagram">
          <div className="wire-wrap">
            {/* Back Wires - Static Gray Template */}
            <div
              className="back-wires-embed"
              dangerouslySetInnerHTML={{ __html: backWiresSVG }}
            />

            {/* Front Wires - Animated Colored with Gradient Mask */}
            <div
              className="front-wires-embed"
              dangerouslySetInnerHTML={{ __html: frontWiresSVG }}
            />
          </div>
        </div>

        {/* Information Cards */}
        <div className="pipeline-cards">
          <div className="info-card user-card">
            <h3>👤 User/Client</h3>
            <p>End user accessing the platform through browser or API client. Requests flow through the entire infrastructure and responses return immediately.</p>
          </div>

          <div className="info-card godaddy-card">
            <h3>🌍 GoDaddy</h3>
            <p><strong>Domain Registration & Management</strong></p>
            <ul>
              <li>Manages DNS records for thepk.in</li>
              <li>Domain renewal & settings</li>
              <li>Email forwarding & SSL setup</li>
            </ul>
          </div>

          <div className="info-card dns-card">
            <h3>🔍 DNS Resolution</h3>
            <p><strong>Domain Name System</strong></p>
            <ul>
              <li>Resolves thepk.in to IP addresses</li>
              <li>Routes traffic to appropriate endpoints</li>
              <li>Handles global DNS propagation</li>
            </ul>
          </div>

          <div className="info-card azure-card">
            <h3>☁️ Azure + Pangolin</h3>
            <p><strong>SSL Termination, Reverse Proxy & Edge Security</strong></p>
            <ul>
              <li><strong>SSL/TLS Encryption:</strong> HTTPS certificate management & secure handshakes</li>
              <li><strong>Reverse Proxy:</strong> Routes external requests to home server backend</li>
              <li><strong>Load Balancing:</strong> Distributes traffic across multiple endpoints</li>
              <li><strong>Security Layer:</strong> DDoS protection & request validation</li>
              <li><strong>Header Manipulation:</strong> CORS, security headers, rate limiting</li>
              <li><strong>Failover:</strong> Automatic traffic routing on service failures</li>
            </ul>
          </div>

          <div className="info-card server-card">
            <h3>🖥️ Home Server</h3>
            <p><strong>AZW MINI S Mini PC - Docker Container Platform</strong></p>
            <ul>
              <li><strong>CPU:</strong> Intel N150 (4 cores, 3.6 GHz)</li>
              <li><strong>RAM:</strong> 16GB DDR4 3200MHz</li>
              <li><strong>Storage:</strong> 512GB SSD</li>
              <li><strong>All services:</strong> Containerized with Docker for isolation</li>
            </ul>
          </div>

          <div className="info-card frontend-card">
            <h3>⚛️ Frontend Service</h3>
            <p><strong>Modern React SPA - Responsive Web Application</strong></p>
            <ul>
              <li><strong>Framework:</strong> React 19.1.1 with hooks & context API</li>
              <li><strong>Build Tool:</strong> Vite 7.1.7 for fast HMR & optimization</li>
              <li><strong>Routing:</strong> React Router v7 for client-side SPA navigation</li>
              <li><strong>Styling:</strong> Responsive CSS with A4-page design & dark mode toggle</li>
              <li><strong>Content:</strong> Dynamic article rendering from Squidex CMS</li>
              <li><strong>Dev Tools:</strong> ESLint 9 for code quality</li>
            </ul>
          </div>

          <div className="info-card backend-card">
            <h3>🔧 Backend Service (REST API)</h3>
            <p><strong>API Server & Business Logic Layer</strong></p>
            <ul>
              <li><strong>Endpoints:</strong> RESTful API for frontend data requests</li>
              <li><strong>CMS Integration:</strong> Squidex OAuth2 client credentials flow</li>
              <li><strong>Authentication:</strong> API key validation & secure headers</li>
              <li><strong>LLM Integration:</strong> Proxy & load balancing to SLM service</li>
              <li><strong>Data Processing:</strong> Rich text conversion & content validation</li>
              <li><strong>Error Handling:</strong> Graceful fallbacks & comprehensive logging</li>
            </ul>
          </div>

          <div className="info-card llm-card">
            <h3>🤖 SLM/LLM Service</h3>
            <p><strong>Language Model Inference & MLOps Pipeline</strong></p>
            <ul>
              <li><strong>Model:</strong> Llama 3.2 Small Language Model via Ollama</li>
              <li><strong>Inference:</strong> Streaming & non-streaming response modes</li>
              <li><strong>Performance:</strong> Optimized for Intel N150 mini PC (4 cores, 16GB RAM)</li>
              <li><strong>API Security:</strong> x-api-key authentication for all requests</li>
              <li><strong>Capability:</strong> Natural language processing & generation at edge</li>
              <li><strong>Scalability:</strong> Containerized for easy deployment & updates</li>
            </ul>
          </div>

          <div className="info-card n8n-card">
            <h3>🔄 n8n Automation</h3>
            <p><strong>Workflow Automation & Integration Platform</strong></p>
            <ul>
              <li><strong>Workflows:</strong> Low-code automation for multi-service integration</li>
              <li><strong>Triggers:</strong> Event-driven automation (webhooks, schedules, API calls)</li>
              <li><strong>Integrations:</strong> Connect frontend, backend, CMS, and external services</li>
              <li><strong>Data Processing:</strong> Transform & validate data across workflows</li>
              <li><strong>Monitoring:</strong> Execution logs & error handling for reliability</li>
              <li><strong>Extensibility:</strong> Custom nodes & API endpoints for advanced automation</li>
            </ul>
          </div>

          <div className="info-card database-card">
            <h3>📚 Squidex CMS</h3>
            <p><strong>Headless Content Management System</strong></p>
            <ul>
              <li><strong>Content Types:</strong> Blog articles with rich text, images, and metadata</li>
              <li><strong>Schema:</strong> Flexible schema for portfolio projects & technical content</li>
              <li><strong>API:</strong> GraphQL & REST APIs for content delivery to frontend</li>
              <li><strong>OAuth2:</strong> Secure client credentials flow for backend authentication</li>
              <li><strong>Version Control:</strong> Content versioning & publish workflow</li>
              <li><strong>Multi-tenancy:</strong> Organized content management for scalability</li>
            </ul>
          </div>

          <div className="info-card portainer-card">
            <h3>⚙️ Portainer</h3>
            <p><strong>Docker Container Management & Orchestration</strong></p>
            <ul>
              <li>Web-based Docker UI for container management</li>
              <li>Real-time container monitoring & metrics</li>
              <li>Image & volume management</li>
              <li>Network configuration & security policies</li>
              <li>Deployment automation & stacks</li>
            </ul>
          </div>

          <div className="info-card dashboard-card">
            <h3>📊 Dashboard (Homer)</h3>
            <p><strong>Service Navigation & System Overview</strong></p>
            <ul>
              <li>Unified dashboard for all internal services</li>
              <li>Quick-access links to monitoring & management tools</li>
              <li>System health status at a glance</li>
              <li>Customizable layout for infrastructure overview</li>
              <li>Single point of entry for internal operations</li>
            </ul>
          </div>

          <div className="info-card excalidraw-card">
            <h3>✏️ Excalidraw</h3>
            <p><strong>Collaborative Diagram & Architecture Design Tool</strong></p>
            <ul>
              <li>Create & visualize system architecture diagrams</li>
              <li>Collaborative whiteboarding for technical design</li>
              <li>Export diagrams in multiple formats (PNG, SVG)</li>
              <li>Version control for design iterations</li>
              <li>Instant sharing & live collaboration features</li>
            </ul>
          </div>

          <div className="info-card data-flow-card">
            <h3>📡 Complete Data Flow Architecture</h3>
            <p><strong>End-to-End Request & Response Cycle with Security</strong></p>
            <ul>
              <li><strong>Request Path:</strong> User Browser → GoDaddy DNS → Azure Reverse Proxy → Home Server</li>
              <li><strong>Service Layer:</strong> Frontend SPA communicates via Backend REST API with authentication</li>
              <li><strong>Data Sources:</strong> Backend integrates with Squidex CMS (OAuth2) & n8n Workflows</li>
              <li><strong>Intelligence:</strong> Optional SLM/LLM inference for AI features via backend proxy</li>
              <li><strong>Infrastructure Ops:</strong> Portainer manages containers; n8n automates deployments</li>
              <li><strong>Monitoring:</strong> Dashboard (Homer) provides operational overview; Excalidraw for documentation</li>
              <li><strong>Security:</strong> End-to-end HTTPS encryption, API key validation, secure OAuth2 flows</li>
            </ul>
          </div>
        </div>

        {/* Technical Skills Section */}
        <div className="pipeline-skills">
          <h2>Skills Demonstrated</h2>
          <div className="skills-grid">
            <div className="skill-item">
              <span className="skill-icon">🏗️</span>
              <span className="skill-name">Architecture Design</span>
            </div>
            <div className="skill-item">
              <span className="skill-icon">🐳</span>
              <span className="skill-name">Docker & Containerization</span>
            </div>
            <div className="skill-item">
              <span className="skill-icon">🔒</span>
              <span className="skill-name">SSL/TLS Security</span>
            </div>
            <div className="skill-item">
              <span className="skill-icon">⚙️</span>
              <span className="skill-name">Reverse Proxy Setup</span>
            </div>
            <div className="skill-item">
              <span className="skill-icon">☁️</span>
              <span className="skill-name">Cloud Services (Azure)</span>
            </div>
            <div className="skill-item">
              <span className="skill-icon">🖥️</span>
              <span className="skill-name">Self-Hosting & DevOps</span>
            </div>
            <div className="skill-item">
              <span className="skill-icon">🌐</span>
              <span className="skill-name">DNS Management</span>
            </div>
            <div className="skill-item">
              <span className="skill-icon">⚡</span>
              <span className="skill-name">Performance Optimization</span>
            </div>
            <div className="skill-item">
              <span className="skill-icon">🤖</span>
              <span className="skill-name">ML Model Deployment</span>
            </div>
            <div className="skill-item">
              <span className="skill-icon">🔄</span>
              <span className="skill-name">API Integration</span>
            </div>
            <div className="skill-item">
              <span className="skill-icon">📊</span>
              <span className="skill-name">Monitoring & Logging</span>
            </div>
            <div className="skill-item">
              <span className="skill-icon">🔧</span>
              <span className="skill-name">Full-Stack Development</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pipeline;
