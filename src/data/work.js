/**
 * Single source of truth for tools and projects.
 *
 * Home reads the featured slice; Tools renders the full list. Previously this
 * data lived inline in Tools.jsx, so the home page could not reference it.
 */

export const TOOLS = [
  { id: 'tool-1', name: 'Git Commit Generator', liveLink: '/tools/git-commit-generator' },
  { id: 'tool-2', name: 'Code Formatter', liveLink: '/tools/code-formatter' },
  { id: 'tool-3', name: 'API Testing Tool', liveLink: '/tools/api-tester' },
  { id: 'tool-4', name: 'Regex Builder', liveLink: '/tools/regex-builder' },
  { id: 'tool-5', name: 'JSON Validator', liveLink: '/tools/json-validator' },
  { id: 'tool-6', name: 'Base64 Encoder/Decoder', liveLink: '/tools/base64-converter' },
  { id: 'tool-7', name: 'Color Palette Generator', liveLink: '/tools/color-palette' },
  { id: 'tool-8', name: 'Password Generator', liveLink: '/tools/password-generator' },
  { id: 'tool-9', name: '2FA Code Generator', liveLink: '/tools/2fa-generator' },
  { id: 'tool-10', name: 'QR Code Generator', liveLink: '/tools/qr-generator' },
  { id: 'tool-11', name: 'Portrait Processor', liveLink: '/tools/portrait-processor' },
];

export const PROJECTS = [
  {
    id: 'project-A',
    name: 'Platform',
    description: 'My platform showcasing projects, skills, and experience.',
    category: 'Web Development',
    status: 'Live',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Docker', 'Jenkins'],
    githubLink: 'https://thepk.in',
    liveLink: 'https://thepk.in',
    startDate: 'Jan 2025',
    endDate: 'Present',
    featured: true,
  },
  {
    id: 'project-D',
    name: 'Video Streaming Platform',
    description:
      'Full-stack platform for video uploading, processing, and streaming with user management.',
    category: 'Web Development',
    status: 'Completed',
    technologies: ['Next.js', 'AWS', 'Docker'],
    githubLink: 'https://github.com/pradhyuman-yadav/shadowveil',
    liveLink: '',
    startDate: 'Oct 2024',
    featured: true,
  },
  {
    id: 'project-C',
    name: 'Trading with ML',
    description: 'ML-powered trading platform using real-time data and optimized pipelines.',
    category: 'Machine Learning',
    status: 'Completed',
    technologies: ['Python', 'Backtrader', 'Machine Learning Libraries'],
    githubLink: 'https://github.com/pradhyuman-yadav/trading-script',
    liveLink: '',
    startDate: 'Dec 2024',
    endDate: 'Jan 2025',
    featured: true,
  },
  {
    id: 'project-I',
    name: 'Full Body Motion Capture Suit',
    description:
      'Motion capture suit using Arduino Mega and MPU9250 sensors for real-time tracking.',
    category: 'Hardware/IoT',
    status: 'Completed',
    technologies: ['Arduino', 'C++', 'MPU9250', 'I2C Multiplexer'],
    githubLink: '',
    liveLink: '',
    startDate: 'Mar 2021',
    endDate: 'Mar 2022',
    featured: true,
  },
  {
    id: 'project-B',
    name: 'JobMatch Automator',
    description: 'Automated job application data collection from multiple job boards.',
    category: 'Automation',
    status: 'Completed',
    technologies: ['Python', 'Selenium', 'Discord Webhooks'],
    githubLink: '',
    liveLink: '',
    startDate: 'Jun 2024',
    endDate: 'Jul 2024',
  },
  {
    id: 'project-E',
    name: 'AI Roommate Assistant',
    description: 'AI assistant to help with roommate tasks.',
    category: 'AI/ML',
    status: 'Completed',
    technologies: ['Python'],
    githubLink: '',
    liveLink: '',
    startDate: 'Sep 2023',
  },
  {
    id: 'project-G',
    name: 'AI Instagram Model',
    description: 'Project to generate images using AI.',
    category: 'AI/ML',
    status: 'Completed',
    technologies: ['Python', 'Generative AI'],
    githubLink: '',
    liveLink: '',
    startDate: 'Jan 2023',
    endDate: 'Feb 2023',
  },
  {
    id: 'project-J',
    name: 'Custom Music Player',
    description: 'Custom music player integrating Spotify and YT Music APIs.',
    category: 'Web Development',
    status: 'Completed',
    technologies: ['ReactJS', 'ExpressJS', 'Spotify API', 'YT Music API'],
    githubLink: '',
    liveLink: '',
    startDate: 'May 2021',
    endDate: 'Jun 2021',
  },
  {
    id: 'project-H',
    name: 'E-Commerce Platform for MIT',
    description:
      'Full-stack e-commerce site for Manipal Institute of Technology with Stripe payments.',
    category: 'Web Development',
    status: 'Completed',
    technologies: ['ReactJS', 'Material-UI', 'ExpressJS', 'Stripe', 'Firebase'],
    githubLink: '',
    liveLink: '',
    startDate: 'Apr 2021',
    endDate: 'May 2021',
  },
  {
    id: 'project-L',
    name: "Parkinson's Disease Detector",
    description: "Deep learning project to detect Parkinson's disease using XGBoost classifier.",
    category: 'Machine Learning',
    status: 'Completed',
    technologies: ['Python', 'Jupyter Notebook', 'XGBoost', 'NumPy', 'pandas', 'scikit-learn'],
    githubLink: '',
    liveLink: '',
    startDate: 'Apr 2020',
    endDate: 'May 2020',
  },
  {
    id: 'project-F',
    name: 'Wild Animal Detection',
    description: 'Computer vision project to detect wild animals.',
    category: 'Computer Vision',
    status: 'Completed',
    technologies: ['Python', 'Computer Vision'],
    githubLink: '',
    liveLink: '',
    startDate: 'Oct 2020',
  },
  {
    id: 'project-K',
    name: 'Fake Profile Detector',
    description: 'Tool to detect fake Instagram profiles using deep learning.',
    category: 'Machine Learning',
    status: 'Completed',
    technologies: ['Python', 'Keras', 'TensorFlow', 'Seaborn'],
    githubLink: '',
    liveLink: '',
    startDate: 'Mar 2020',
    endDate: 'Jul 2020',
  },
  {
    id: 'project-M',
    name: 'Color Detection Application',
    description: 'OpenCV project for color detection and analysis in images.',
    category: 'Computer Vision',
    status: 'Completed',
    technologies: ['Python', 'OpenCV', 'NumPy', 'pandas'],
    githubLink: '',
    liveLink: '',
    startDate: 'Mar 2020',
    endDate: 'Apr 2020',
  },
  {
    id: 'project-N',
    name: 'Newsletter Signup Website',
    description: 'Newsletter signup site with MailChimp integration, hosted on Heroku.',
    category: 'Web Development',
    status: 'Completed',
    technologies: ['HTML', 'CSS', 'NodeJS', 'ExpressJS', 'MailChimp API'],
    githubLink: '',
    liveLink: '',
    startDate: 'Oct 2019',
    endDate: 'Nov 2019',
  },
];

/** The running work, surfaced on the home page in the present tense. */
export const NOW = [
  {
    to: '/llm-chat',
    title: 'Running open models on my own hardware',
    description:
      'A chat interface over self-hosted LLMs, with streaming responses and model switching. No third-party inference.',
  },
  {
    to: '/pipeline',
    title: 'Hosting the whole stack myself',
    description:
      'Eight services behind this site — CMS, automation, containers, dashboards — deployed and maintained on my own infrastructure.',
  },
  {
    to: '/dc-metro',
    title: 'Shipping small, useful things',
    description:
      'A live Washington DC Metro arrivals board, plus eleven browser tools I keep because I use them.',
  },
];

/** Distinct fields the project list actually spans, newest first. */
export const CATEGORIES = [...new Set(PROJECTS.map((p) => p.category))];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export default { TOOLS, PROJECTS, NOW, CATEGORIES, FEATURED_PROJECTS };
