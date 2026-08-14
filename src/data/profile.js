export const personalInfo = {
  firstName: 'Mahesh',
  lastName: 'Tawar',
  fullName: 'Mahesh Tawar',
  titles: ['Java Backend Developer', 'Full Stack Engineer', 'Spring Boot Architect', 'Problem Solver'],
  tagline: '2× Promoted in 2 Years',
  bio: 'Built and shipped 15+ production features across 5 multi-tenant environments using Java 17, Spring Boot, and MySQL. Cut API latency by 97%, architected zero-deployment notification engines, and designed config-driven systems eliminating repeated code changes.',
  location: 'Pune, India',
  email: 'mahesh28tawar@gmail.com',
  phone: '+91-9923339221',
  resume: 'https://drive.google.com/file/d/1NaJ18dex-V_JdxWpU9o26fAo3cAruAjj/view?usp=drive_link',
  profileImage: '/avtar.png',
  social: {
    github: 'https://github.com/maheshtawar',
    linkedin: 'https://linkedin.com/in/maheshtawar',
    portfolio: 'https://maheshtawar.github.io',
  },
  stats: [
    { label: 'Years Experience', value: '2+' },
    { label: 'Production Features', value: '15+' },
    { label: 'Certifications', value: '6+' },
    { label: 'Users Impacted', value: '50K+' },
  ],
  contacts: [
    {
      type: 'Email',
      value: 'mahesh28tawar@gmail.com',
      icon: 'pi-envelope',
      link: 'mailto:mahesh28tawar@gmail.com',
    },
    {
      type: 'Phone',
      value: '+91-9923339221',
      icon: 'pi-phone',
      link: 'tel:+919923339221',
    },
    {
      type: 'Location',
      value: 'Pune, India',
      icon: 'pi-map-marker',
      link: null,
    },
    {
      type: 'GitHub',
      value: 'github.com/maheshtawar',
      icon: 'pi-github',
      link: 'https://github.com/maheshtawar',
    },
    {
      type: 'LinkedIn',
      value: 'linkedin.com/in/maheshtawar',
      icon: 'pi-linkedin',
      link: 'https://linkedin.com/in/maheshtawar',
    },
  ],
};

export const projects = [
  {
    title: 'Face Recognition Attendance System',
    subtitle: 'Python — Tkinter & MySQL',
    description: 'AI-powered attendance system using face recognition. Captures and identifies faces in real-time, logging attendance automatically with a MySQL backend.',
    image: 'assets/img/img1.jpg',
    github: 'https://github.com/maheshtawar/face-recognition-attendance-system',
    demo: 'https://youtu.be/XvSJLnrZtmo?si=xwiiu48wmmSY_AeO',
    tags: ['Python', 'Tkinter', 'MySQL', 'AI', 'OpenCV'],
    category: 'AI',
    featured: true,
  },
  {
    title: 'Portfolio Website',
    subtitle: 'React + Vite + Anime.js',
    description: 'Award-worthy personal portfolio with cinematic animations, glassmorphism design, and interactive particle systems built with React and anime.js.',
    image: 'assets/img/img3.jpg',
    github: 'https://github.com/maheshtawar/maheshtawar.github.io',
    demo: 'https://maheshtawar.github.io',
    tags: ['React', 'Vite', 'Anime.js', 'CSS3'],
    category: 'Web',
    featured: true,
  },
  {
    title: 'Image to PDF Converter',
    subtitle: 'Python — Tkinter Desktop App',
    description: 'Desktop application to batch convert images to PDF with drag-and-drop support, custom ordering, and quality settings.',
    image: 'assets/img/img2.jpg',
    github: 'https://github.com/maheshtawar/Image2PDF_Converter',
    demo: null,
    tags: ['Python', 'Tkinter', 'PDF', 'Desktop'],
    category: 'Utility',
    featured: false,
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
    highlights: [
      'Reduced operational overhead by ~80% with automated job scheduler replacing fully manual processes',
      'Improved account security for 50,000+ users via OTP-based password reset with AES encryption',
      'Built cascading user-data cleanup module with transactional deletes and trigger-based audit logging — zero data loss',
      'Consolidated 8+ backend queries into optimized JDBC/JdbcTemplate queries with custom RowMappers across 7 data tabs',
      'Migrated 10+ schedulers from monolith to dedicated microservice with Spring profile-based tenant isolation',
    ],
  },
];

export const skills = [
  {
    title: 'Languages',
    icon: 'pi-code',
    items: [
      { name: 'Java 17', level: 90 },
      { name: 'JavaScript', level: 80 },
      { name: 'SQL', level: 85 },
      { name: 'HTML5', level: 85 },
      { name: 'CSS3', level: 80 },
      { name: 'Python', level: 65 },
    ],
  },
  {
    title: 'Backend',
    icon: 'pi-server',
    items: [
      { name: 'Spring Boot', level: 90 },
      { name: 'Spring Security', level: 80 },
      { name: 'REST APIs', level: 90 },
      { name: 'Microservices', level: 75 },
      { name: 'Maven', level: 80 },
    ],
  },
  {
    title: 'Frontend',
    icon: 'pi-desktop',
    items: [
      { name: 'Vue.js 3', level: 80 },
      { name: 'React', level: 70 },
      { name: 'PrimeVue', level: 75 },
    ],
  },
  {
    title: 'Database',
    icon: 'pi-database',
    items: [
      { name: 'MySQL', level: 90 },
      { name: 'Redis', level: 70 },
      { name: 'Query Optimization', level: 85 },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: 'pi-cog',
    items: [
      { name: 'Git', level: 85 },
      { name: 'GitLab CI/CD', level: 75 },
      { name: 'Nginx', level: 70 },
      { name: 'JUnit 5', level: 80 },
      { name: 'Postman', level: 85 },
    ],
  },
];

export const education = [
  {
    degree: 'M.Sc. in Computer Science',
    institution: 'Sinhgad College of Science, Pune',
    period: 'Aug 2021 – Aug 2023',
    icon: 'pi-graduation-cap',
  },
  {
    degree: 'B.Sc. in Computer Science',
    institution: 'Sinhgad College of Science, Pune',
    period: 'Jun 2018 – Aug 2021',
    icon: 'pi-graduation-cap',
  },
];

export const sectionConfig = {
  hero: {
    subtitle: "Hello, I'm",
    buttons: {
      projects: "View Projects",
      contact: "Contact Me"
    }
  },
  skills: {
    title: "Technical Arsenal",
  },
  projects: {
    title: "Featured Projects",
  },
  experience: {
    title: "Career Journey",
  },
  certificates: {
    title: "Certifications",
  },
  education: {
    title: "Education",
  },
  contact: {
    title: "Get In Touch",
    subtitle: "Let's Build Something Amazing",
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      button: "Send Message"
    }
  },
  footer: {
    disclaimer: ""
  }
};

export const certificates = [
  {
    name: 'MySQL 8.0 Database Developer Oracle Certified Professional',
    issuer: 'Oracle',
    image: '/certificate.png',
    color: '#f03e2f',
    link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=C7A1868F1DE802DDBEA32539DA3D10CB2134500833224F4B5ABD322690FA0154'
  },
  {
    name: 'Full Stack Development — DNExT',
    issuer: 'MKCL',
    image: '/certificate.png',
    color: '#10b981',
    link: 'https://drive.google.com/file/d/1QiCmcYk6trNf03jt0kVUbmsRa3nqzx4m/view?usp=drive_link'
  },
  {
    name: 'MTA: Introduction to Programming using JavaScript',
    issuer: 'Microsoft',
    image: '/certificate.png',
    color: '#0078d4',
    link: 'https://www.certiport.com/Portal/Pages/PrintTranscriptInfo.aspx?action=Cert&id=396&cvid=4hTlskh/u3Ta8HB/QMQeOw=='
  },
  {
    name: 'Python Object-Oriented Programming',
    issuer: 'LinkedIn Learning',
    image: '/certificate.png',
    color: '#0a66c2',
    link: 'https://www.linkedin.com/learning/certificates/fa77b1274195788b73bb07bb6033a95f84d10ccb6d8ffdc00d1ac5117af2f4b5'
  },
  {
    name: 'Django Web Framework',
    issuer: 'Great Learning',
    image: '/certificate.png',
    color: '#092e20',
    link: 'https://verify.mygreatlearning.com/verify/JVWEYYZR'
  },
  {
    name: 'Android Studio Essential Training',
    issuer: 'LinkedIn Learning',
    image: '/certificate.png',
    color: '#3ddc84',
    link: 'https://www.linkedin.com/learning/certificates/7f154cb2a93e652f78d53120eace9ff8f141e9f78047c067082cf55ef4cd31be'
  }
];
