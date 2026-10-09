// =========================================
// PORTFOLIO DATA — Single source of truth
// Update this file to change portfolio content
// =========================================

export const personalInfo = {
  firstName: 'Mahesh',
  lastName: 'Tawar',
  fullName: 'Mahesh Tawar',
  headline: 'Java Backend Developer & Secure Systems Engineer',
  tagline: 'Building secure, scalable, high-performance systems with Spring Boot, Microservices, MySQL & Redis.',
  bio: 'Shipped 15+ production features across 5 multi-tenant environments using Java 17, Spring Boot, and MySQL. Secured 50,000+ user accounts with AES/JWE encrypted OTP pipelines, slashed API latency by 97%, and architected zero-leakage multi-tenant isolation.',
  philosophy: 'Security and scale are inseparable. I design systems with zero-trust boundaries, defensive input validation, and clean abstractions that protect enterprise data without sacrificing throughput.',
  currentRole: 'Senior Project Associate I',
  currentCompany: 'Maharashtra Knowledge Corporation Limited (MKCL)',
  location: 'Pune, India',
  email: 'mahesh28tawar@gmail.com',
  phone: '+91-9923339221',
  resume: 'https://drive.google.com/file/d/10GGVoX9YMCOFdd85DQz4covdv2vhv3ym/view?usp=sharing',
  profileImage: '/mahesh-portrait.jpg',
  engineeringImage: '/mahesh-devsecops.jpg',
  social: {
    github: 'https://github.com/maheshtawar',
    linkedin: 'https://www.linkedin.com/in/maheshtawar/',
    portfolio: 'https://maheshtawar.github.io',
  },
  stats: [
    { label: 'Years Experience', value: '2+' },
    { label: 'Production Features', value: '15+' },
    { label: 'Certifications', value: '7+' },
    { label: 'Users Impacted', value: '50K+' },
  ],
  exploring: ['System Design', 'AI/ML Integration', 'Cloud Architecture', 'Performance Optimization'],
};

export const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export const skills = [
  {
    category: 'Backend',
    icon: '⚙️',
    items: [
      { name: 'Java 17', description: 'Primary language for building enterprise backend systems' },
      { name: 'Spring Boot', description: 'Framework for production-grade microservices and REST APIs' },
      { name: 'REST APIs', description: 'Designed and shipped 15+ RESTful endpoints in production' },
      { name: 'Microservices', description: 'Migrated monolith schedulers to isolated microservice architecture' },
      { name: 'Spring Security', description: 'JWT, OTP-based auth, AES/JWE encryption implementations' },
      { name: 'JDBC / JdbcTemplate', description: 'Custom RowMappers, optimized queries across multi-tenant systems' },
    ],
  },
  {
    category: 'Security & Systems',
    icon: '🛡️',
    items: [
      { name: 'Spring Security & RBAC', description: 'Role-based access control, session fixation, and CSRF defense' },
      { name: 'AES-256 & JWE Encryption', description: 'End-to-end token encryption for OTP flows securing 50,000+ accounts' },
      { name: 'Multi-Tenant Isolation', description: 'Strict row-level boundary enforcement across 5 enterprise profiles' },
      { name: 'Audit Trails & Triggers', description: 'MySQL trigger-based audit logging for compliance and forensic history' },
      { name: 'Zero-Trust API Security', description: 'Defensive DTO validation, parameterized SQL injection immunity' },
    ],
  },
  {
    category: 'Database',
    icon: '🗄️',
    items: [
      { name: 'MySQL', description: 'Primary database — indexing, optimization, complex joins' },
      { name: 'Redis', description: 'Caching layer for OTP flows and API response optimization' },
      { name: 'Query Optimization', description: 'Consolidated 8+ queries, indexed for performance gains' },
      { name: 'SQL', description: 'Advanced queries, stored procedures, trigger-based audit logging' },
    ],
  },
  {
    category: 'Frontend',
    icon: '🖥️',
    items: [
      { name: 'Vue.js 3', description: 'Production frontend framework with Composition API' },
      { name: 'PrimeVue', description: 'Component library for enterprise UI development' },
      { name: 'React', description: 'Personal projects and portfolio development' },
      { name: 'JavaScript', description: 'ES6+, async patterns, DOM manipulation' },
      { name: 'HTML5 / CSS3', description: 'Semantic markup, responsive design, animations' },
    ],
  },
  {
    category: 'DevOps & Tools',
    icon: '🔧',
    items: [
      { name: 'Git', description: 'Version control with branching strategies and code reviews' },
      { name: 'GitLab CI/CD', description: 'Zero deployment incidents across 5 tenant profiles' },
      { name: 'Docker', description: 'Containerized development and deployment workflows' },
      { name: 'Maven', description: 'Build automation and dependency management' },
      { name: 'Nginx', description: 'Reverse proxy and static file serving configuration' },
      { name: 'Postman', description: 'API testing, collection management, automation' },
      { name: 'JUnit 5', description: 'Unit and integration testing with edge case coverage' },
    ],
  },
  {
    category: 'AI / ML',
    icon: '🤖',
    items: [
      { name: 'Python', description: 'Scripting, automation, and ML model integration' },
      { name: 'OpenCV', description: 'Real-time face detection and image processing' },
      { name: 'TensorFlow', description: 'Model training for recognition systems' },
      { name: 'ONNX Runtime', description: 'Optimized model inference for production' },
      { name: 'Hugging Face', description: 'NLP model exploration and experimentation' },
    ],
  },
];

export const experiences = [
  {
    title: 'Senior Project Associate I',
    role: 'Full Stack Developer',
    company: 'Maharashtra Knowledge Corporation Limited (MKCL)',
    location: 'Pune, India',
    period: 'Jun 2026 – Present',
    type: 'promotion',
    technologies: ['Java 17', 'Spring Boot', 'MySQL', 'Redis', 'Vue 3', 'Microservices'],
    highlights: [
      'Designed config-driven Enquiry-to-Admission system with dynamic forms — eliminating code changes for every new enquiry type',
      'Built 2 config-driven engines (Notification + Scheduler) removing code deployments entirely — Teams/Email/SMS via DB templates',
      'Enabled reallocation of 1,000+ users with bulk processing module featuring transactional integrity and audit trails',
      'Reduced fraudulent registrations via OTP-based verification with Redis caching, JWE encryption, and JUnit edge case coverage',
      'Shipped 3 workflow enhancements in one sprint while mentoring 4 developers through structured code reviews',
    ],
  },
  {
    title: 'Project Associate',
    role: 'Backend Developer',
    company: 'MKCL',
    location: 'Pune, India',
    period: 'Jun 2025 – May 2026',
    type: 'promotion',
    technologies: ['Java 17', 'Spring Boot', 'MySQL', 'Redis', 'JUnit 5', 'CI/CD'],
    highlights: [
      'Cut API response time from 2s to 65ms (97% reduction) with server-side pagination, indexed queries, and parallel fetching for 500+ daily active centers',
      'Built dynamic receipt system with QR codes and GST calculations across 4 organizational units with multi-tenant isolation',
      'Enabled 10,000+ users to re-register across 5 tenant environments using Strategy pattern with fallback mechanisms',
      'Achieved zero deployment incidents across 5 tenant profiles — owning the full CI/CD lifecycle',
      'Built admin data-edit module with image cropping, CDN management, version history, and role-based access control',
    ],
  },
  {
    title: 'Project Trainee',
    role: 'Software Engineer',
    company: 'MKCL',
    location: 'Pune, India',
    period: 'Mar 2024 – May 2025',
    type: 'start',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'JDBC', 'Microservices'],
    highlights: [
      'Reduced operational overhead by ~80% with automated job scheduler replacing fully manual processes',
      'Improved account security for 50,000+ users via OTP-based password reset with AES encryption',
      'Built cascading user-data cleanup module with transactional deletes and trigger-based audit logging — zero data loss',
      'Consolidated 8+ backend queries into optimized JDBC/JdbcTemplate queries with custom RowMappers across 7 data tabs',
      'Migrated 10+ schedulers from monolith to dedicated microservice with Spring profile-based tenant isolation',
    ],
  },
];

export const projects = [
  {
    title: 'Face Recognition Attendance System',
    subtitle: 'Python · OpenCV · MySQL',
    description: 'AI-powered attendance system using face recognition. Captures and identifies faces in real-time, logging attendance automatically with a MySQL backend.',
    problem: 'Manual attendance tracking was time-consuming and prone to proxy attendance.',
    solution: 'Built a real-time face recognition system using OpenCV that automatically identifies and logs attendance to a MySQL database.',
    architecture: ['Python App', 'OpenCV', 'Face Recognition Model', 'MySQL Database', 'Tkinter UI'],
    keyFeatures: [
      'Real-time face detection and recognition',
      'Automatic attendance logging',
      'MySQL backend for data persistence',
      'Desktop GUI built with Tkinter',
    ],
    github: 'https://github.com/maheshtawar/face-recognition-attendance-system',
    demo: 'https://youtu.be/XvSJLnrZtmo?si=xwiiu48wmmSY_AeO',
    tags: ['Python', 'OpenCV', 'MySQL', 'AI', 'Tkinter'],
    category: 'AI/ML',
    featured: true,
  },
  {
    title: 'Portfolio Website',
    subtitle: 'React · Vite · GSAP',
    description: 'Premium personal portfolio with cinematic animations, interactive elements, and a responsive design showcasing projects and experience.',
    problem: 'Needed a professional web presence that demonstrates frontend engineering skills beyond just a resume.',
    solution: 'Built a React-based portfolio with scroll-driven animations, interactive sections, and clean architecture.',
    architecture: ['React 19', 'Vite', 'GSAP', 'CSS3', 'GitHub Pages'],
    keyFeatures: [
      'Interactive scroll animations',
      'Dark/light theme system',
      'Responsive design for all devices',
      'Terminal emulator easter egg',
    ],
    github: 'https://github.com/maheshtawar/maheshtawar.github.io',
    demo: 'https://maheshtawar.github.io',
    tags: ['React', 'Vite', 'GSAP', 'CSS3'],
    category: 'Frontend',
    featured: true,
  },
  {
    title: 'Image to PDF Converter',
    subtitle: 'Python · Tkinter Desktop App',
    description: 'Desktop application to batch convert images to PDF with drag-and-drop support, custom ordering, and quality settings.',
    problem: 'Converting multiple images to a single PDF required online tools with size limits and privacy concerns.',
    solution: 'Built an offline desktop tool with drag-and-drop, batch processing, custom ordering, and quality controls.',
    architecture: ['Python App', 'Tkinter UI', 'Pillow', 'ReportLab'],
    keyFeatures: [
      'Batch image to PDF conversion',
      'Drag-and-drop file support',
      'Custom page ordering',
      'Adjustable quality settings',
    ],
    github: 'https://github.com/maheshtawar/Image2PDF_Converter',
    demo: null,
    tags: ['Python', 'Tkinter', 'PDF', 'Desktop'],
    category: 'Utility',
    featured: false,
  },
];

export const certificates = [
  {
    name: 'Redis Associate Developer — Certified Professional',
    issuer: 'Redis',
    color: '#d82c20',
    link: 'https://credentials.redis.io/5d3b6e4e-b321-45d4-a87b-6659345bc05e#acc.y68a1ecu',
    credentialId: '5d3b6e4e-b321-45d4-a87b-6659345bc05e',
    flagship: true,
  },
  {
    name: 'MySQL 8.0 Database Developer — Oracle Certified Professional',
    issuer: 'Oracle',
    color: '#f03e2f',
    link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=C7A1868F1DE802DDBEA32539DA3D10CB2134500833224F4B5ABD322690FA0154',
    flagship: true,
  },
  {
    name: 'Full Stack Development — DNExT',
    issuer: 'MKCL',
    color: '#10b981',
    link: 'https://drive.google.com/file/d/1QiCmcYk6trNf03jt0kVUbmsRa3nqzx4m/view?usp=drive_link',
  },
  {
    name: 'MTA: Introduction to Programming using JavaScript',
    issuer: 'Microsoft',
    color: '#0078d4',
    link: 'https://www.certiport.com/Portal/Pages/PrintTranscriptInfo.aspx?action=Cert&id=396&cvid=4hTlskh/u3Ta8HB/QMQeOw==',
  },
  {
    name: 'Python Object-Oriented Programming',
    issuer: 'LinkedIn Learning',
    color: '#0a66c2',
    link: 'https://www.linkedin.com/learning/certificates/fa77b1274195788b73bb07bb6033a95f84d10ccb6d8ffdc00d1ac5117af2f4b5',
  },
  {
    name: 'Django Web Framework',
    issuer: 'Great Learning',
    color: '#092e20',
    link: 'https://verify.mygreatlearning.com/verify/JVWEYYZR',
  },
  {
    name: 'Android Studio Essential Training',
    issuer: 'LinkedIn Learning',
    color: '#3ddc84',
    link: 'https://www.linkedin.com/learning/certificates/7f154cb2a93e652f78d53120eace9ff8f141e9f78047c067082cf55ef4cd31be',
  },
];

export const education = [
  {
    degree: 'M.Sc. in Computer Science (8.83 CGPA)',
    institution: 'Sinhgad College of Science, Pune',
    period: 'Aug 2021 – Aug 2023',
    grade: '8.83 CGPA',
  },
  {
    degree: 'B.Sc. in Computer Science (89.05% Distinction)',
    institution: 'Sinhgad College of Science, Pune',
    period: 'Jun 2018 – Aug 2021',
    grade: '89.05% Distinction',
  },
];

export const engineeringProcess = [
  { step: 'API Design', description: 'RESTful endpoints with proper status codes, validation, and versioning', icon: '📡' },
  { step: 'Business Logic', description: 'Clean service layer with Strategy, Builder, and Template patterns', icon: '🧠' },
  { step: 'Caching', description: 'Redis-based caching for OTP flows and high-traffic API responses', icon: '⚡' },
  { step: 'Database', description: 'Indexed queries, pagination, multi-tenant isolation, audit logging', icon: '🗄️' },
  { step: 'Testing', description: 'JUnit 5 with edge case coverage, integration tests for critical flows', icon: '🧪' },
  { step: 'Deployment', description: 'GitLab CI/CD pipelines with zero-incident deployment record', icon: '🚀' },
];

export const terminalCommands = {
  help: `Available commands:
  about     — Who am I
  skills    — Technical skills
  experience — Work history
  projects  — Featured projects
  education — Academic background
  contact   — Get in touch
  security  — Secure system architecture & practices
  messages  — View logged contact messages
  excel     — Export contact messages to Excel (.csv)
  resume    — Download resume
  clear     — Clear terminal`,
  about: `Mahesh Tawar
━━━━━━━━━━━━━━━━━━━━
Java Backend Developer
Senior Project Associate I @ MKCL, Pune

2× Promoted in 2 Years
15+ Production Features Shipped
50,000+ Users Impacted`,
  skills: `Technical Skills
━━━━━━━━━━━━━━━━━━━━
Backend:   Java 17 · Spring Boot · REST APIs · Microservices
Database:  MySQL · Redis · Query Optimization
Frontend:  Vue 3 · React · PrimeVue · JavaScript
DevOps:    Git · GitLab CI/CD · Docker · Maven · Nginx
AI/ML:     Python · OpenCV · TensorFlow · ONNX Runtime`,
  experience: `Career Journey
━━━━━━━━━━━━━━━━━━━━
▸ Senior Project Associate I — MKCL (Jun 2026 – Present)
  Full Stack Developer · ↑ Promoted

▸ Project Associate — MKCL (Jun 2025 – May 2026)
  Backend Developer · ↑ Promoted

▸ Project Trainee — MKCL (Mar 2024 – May 2025)
  Software Engineer · Starting Role`,
  projects: `Featured Projects
━━━━━━━━━━━━━━━━━━━━
▸ Face Recognition Attendance System
  Python · OpenCV · MySQL · AI

▸ Portfolio Website
  React · Vite · GSAP

▸ Image to PDF Converter
  Python · Tkinter · Desktop`,
  education: `Education
━━━━━━━━━━━━━━━━━━━━
▸ M.Sc. Computer Science
  Sinhgad College of Science, Pune (2021–2023)

▸ B.Sc. Computer Science
  Sinhgad College of Science, Pune (2018–2021)`,
  contact: `Contact Information
━━━━━━━━━━━━━━━━━━━━
Email:    mahesh28tawar@gmail.com
Phone:    +91-9923339221
GitHub:   github.com/maheshtawar
LinkedIn: linkedin.com/in/maheshtawar
Location: Pune, India

Open to new opportunities!`,
  resume: `Opening resume...
→ /Mahesh_Tawar.pdf`,
  whoami: `Mahesh Tawar — Java Backend Developer
Building scalable systems with Spring Boot, Microservices, MySQL & Redis.`,
};

// =========================================
// CONTACT FORM & SPREADSHEET CONFIGURATION
// =========================================
export const contactConfig = {
  // Your Google Sheet / Excel document:
  googleSheetDocUrl: 'https://docs.google.com/spreadsheets/d/1LOrJ4U6Q1t50QoVDsxEytPPGvv5uSo6TIkiPLihyf-I/edit?gid=600720360#gid=600720360',
  googleSheetId: '1LOrJ4U6Q1t50QoVDsxEytPPGvv5uSo6TIkiPLihyf-I',

  // Google Apps Script Web App URL:
  googleSheetScriptUrl: 'https://script.google.com/macros/s/AKfycbz7HCtEgPa6EhfuHlVMKmpKIiRpopiORzVuhHg6ib38tdxyg38Msr3ia92VJsH9I9-8/exec',
};

