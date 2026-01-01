export const personalInfo = {
  firstName: 'Mahesh',
  lastName: 'Tawar',
  fullName: 'Mahesh Tawar',
  titles: ['Full Stack Developer', 'Backend Engineer'],
  bio: 'I am a passionate full stack developer with experience in building scalable web applications using modern technologies like Vue.js, Spring Boot, and MySQL.',
  location: 'Pune, India',
  email: 'maheshtawar@pm.me',
  phone: '+91-9923339221',
  resume: 'https://drive.google.com/file/d/1NaJ18dex-V_JdxWpU9o26fAo3cAruAjj/view?usp=drive_link',
  profileImage: '',
  social: {
    github: 'https://github.com/maheshtawar',
    linkedin: 'https://linkedin.com/in/maheshtawar',
    portfolio: 'https://maheshtawar.github.io',
  },
  contacts: [
    {
      type: 'Email',
      value: 'maheshtawar@pm.me',
      icon: 'assets/img/Logo/email-logo.png',
      link: 'mailto:maheshtawar@pm.me',
    },
    {
      type: 'Phone',
      value: '+91-9923339221',
      icon: 'assets/img/Logo/phone.png',
      link: 'tel:+919923339221',
    },
    {
      type: 'Location',
      value: 'Pune, India',
      icon: 'assets/img/Logo/location.png',
      link: null,
    },
    {
      type: 'GitHub',
      value: 'github.com/maheshtawar',
      icon: 'assets/img/Logo/github-logo.png',
      link: 'https://github.com/maheshtawar',
    },
    {
      type: 'LinkedIn',
      value: 'linkedin.com/in/maheshtawar',
      icon: 'assets/img/Logo/linkedin.png',
      link: 'https://linkedin.com/in/maheshtawar',
    },
  ],
};

export const projects = [
  {
    title: 'Face Recognition Attendance System',
    subtitle: 'Python - tkinter and MySQL',
    description: 'Face Recognition Attendance System Using Python',
    image: 'assets/img/img1.jpg',
    github: 'https://github.com/maheshtawar/face-recognition-attendance-system',
    demo: 'https://youtu.be/XvSJLnrZtmo?si=xwiiu48wmmSY_AeO',
    tags: ['Python', 'Tkinter', 'MySQL', 'AI'],
    category: 'AI',
  },
  {
    title: 'Portfolio Projects',
    subtitle: 'Web Projects Showcase',
    description: 'A collection of my web projects and experiments.',
    image: 'assets/img/img3.jpg',
    github: 'https://github.com/maheshtawar/maheshtawar.github.io',
    demo: 'https://maheshtawar.github.io/projects.html',
    tags: ['Web', 'HTML', 'CSS', 'JavaScript'],
    category: 'Web',
  },
  {
    title: 'Image to PDF Converter',
    subtitle: 'Python - tkinter',
    description: 'Convert images to PDF using Python and Tkinter.',
    image: 'assets/img/img2.jpg',
    github: 'https://github.com/maheshtawar/Image2PDF_Converter',
    demo: null,
    tags: ['Python', 'Tkinter', 'PDF'],
    category: 'Utility',
  },
];

export const experiences = [
  {
    title: 'Full Stack Developer',
    company: 'Maharashtra Knowledge Corporation Limited (MKCL)',
    period: '2024 - Present',
    description: 'Worked on building scalable web applications using Vue.js and Spring Boot.',
  },
];

export const skills = [
  {
    title: 'Frontend (Client-Side)',
    items: [
      { name: 'JavaScript', image: 'assets/img/Logo/javascript-logo.png' },
      { name: 'Vue.js', image: 'assets/img/Logo/vue-logo.png' },
    ],
  },
  {
    title: 'Backend (Server-Side)',
    items: [
      { name: 'Java', image: 'assets/img/Logo/java-logo.png' },
      { name: 'Spring Boot', image: 'assets/img/Logo/spring-logo.png' },
    ],
  },
  {
    title: 'Database',
    items: [
      { name: 'MySQL', image: 'assets/img/Logo/mysql-logo.png' },
    ],
  },
  {
    title: 'Tools & DevOps',
    items: [
      { name: 'Git', image: 'assets/img/Logo/git-logo.png' },
      { name: 'GitHub', image: 'assets/img/Logo/github-logo.png' },
    ],
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
    title: "Skills",
  },
  projects: {
    title: "Projects",
  },
  experience: {
    title: "Experience",
  },
  certificates: {
    title: "Certificates",
  },
  contact: {
    title: "Get In Touch",
    subtitle: "Contact Information",
    form: {
      name: "Name",
      email: "Email",
      mobile: "Mobile",
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
    link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=C7A1868F1DE802DDBEA32539DA3D10CB2134500833224F4B5ABD322690FA0154'
  },
  {
    name: 'MKCL’s DIPLOMA in New and Exponential Technologies [DNExT]',
    issuer: 'Maharashtra Knowledge Corporation Limited',
    image: '/certificate.png',
    link: 'https://drive.google.com/file/d/1QiCmcYk6trNf03jt0kVUbmsRa3nqzx4m/view?usp=drive_link'
  },
  {
    name: 'MTA: Introduction to Programming using JavaScript',
    issuer: 'Microsoft',
    image: '/certificate.png',
    link: 'https://www.certiport.com/Portal/Pages/PrintTranscriptInfo.aspx?action=Cert&id=396&cvid=4hTlskh/u3Ta8HB/QMQeOw=='
  },
  {
    name: 'Python Object-Oriented Programming',
    issuer: 'LinkedIn Learning',
    image: '/certificate.png',
    link: 'https://www.linkedin.com/learning/certificates/fa77b1274195788b73bb07bb6033a95f84d10ccb6d8ffdc00d1ac5117af2f4b5'
  },
  {
    name: 'Django',
    issuer: 'Great Learning',
    image: '/certificate.png',
    link: 'https://verify.mygreatlearning.com/verify/JVWEYYZR'
  },
  {
    name: 'Android Studio Essential Training',
    issuer: 'LinkedIn Learning',
    image: '/certificate.png',
    link: 'https://www.linkedin.com/learning/certificates/7f154cb2a93e652f78d53120eace9ff8f141e9f78047c067082cf55ef4cd31be'
  }
];


