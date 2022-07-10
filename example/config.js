module.exports = {
  pathPrefix: '',
  siteUrl: 'https://boyanzh.site',
  title: 'BoYanZh',
  description: 'Personal Website of BoYanZh',
  author: 'Boming ZHANG',
  authorAlternative: '张泊明',
  introduction: [
    'Hi there, I am BoYanZh (Boming Zhang). I am a software developer from China. 🇨🇳',
    'I am keen on writing high-quality, readable, and maintainable codes with the help of check tools. Also, automating the whole process from development to deployment with CI/CD is one of my interests.',
    'I like to build software with real-world impact and is accessible by everyone and everywhere. So I have taken part in plenty of Web projects, working mainly on the backend side with `Python3` and `Go`. I am trying to dive deeper and deeper into the backend side.',
    'I have built lots of handy tools and platforms for my undergraduate institute. They mainly aim at making the life of students easier. Check this [Gist](https://gist.github.com/BoYanZh/fc4469c20fd6adf42c212114532aaac0) for a collection of useful tools built by other students and me!',
    'Get my coding statistics here since entering college: [![wakatime](https://wakatime.com/badge/user/8dcab400-e2d4-43ad-8a8f-7a94a34ea7b6.svg)](https://wakatime.com/@8dcab400-e2d4-43ad-8a8f-7a94a34ea7b6).',
  ],
  avatar: 'avatar.png',
  professions: ['Undergraduate Student', 'Full-Stack Developer'],
  tocMaxDepth: 2,
  excerptMaxLength: 500,
  birthday: 'Mar. 16, 2000',
  location: 'Shanghai, China',
  email: 'bomingzh@sjtu.edu.cn',
  language: '中文, English',
  postsForArchivePage: 3,
  defaultLanguage: 'en',
  disqusScript:
    process.env.DISQUS_SCRIPT || 'https://boyanzh.disqus.com/embed.js',
  pages: {
    home: '/',
    posts: 'posts',
    contact: 'contact',
    resume: 'resume',
    tags: 'tags',
    project: 'project',
    wakatime: 'wakatime',
  },
  social: [
    {
      url: '/resume.pdf',
      icon: ['ai', 'cv'],
    },
    {
      url: 'https://github.com/BoYanZh',
      icon: ['fab', 'github'],
    },
    {
      url: 'https://twitter.com/BoYanZh233',
      icon: ['fab', 'twitter'],
    },
    {
      url: 'https://t.me/BoYanZh',
      icon: ['fab', 'telegram'],
    },
    {
      url: 'https://www.linkedin.com/in/boming-zhang-1aba46244/',
      icon: ['fab', 'linkedin'],
    },
    {
      url: 'https://steamcommunity.com/id/boyanzh',
      icon: ['fab', 'steam'],
    },
  ],
  // facebook: 'https://www.facebook.com/rolwin.monteiro',
  // instagram: 'https://www.instagram.com/reevan100/',
  // rss: '/rss.xml',
  wakatime: {
    username: 'boyanzh',
    activity: '8ec8868a-3e3b-4d1d-845f-b1ba0a474e72',
    language: '910c9181-965c-4d66-a371-c5d9ffeafbac',
    editor: '489d2fc7-aa89-4984-af24-17115132d603',
    os: '84d9c631-f6c1-4553-a0cc-cc3634936846',
  },
  contactFormUrl: process.env.CONTACT_FORM_ENDPOINT || '',
  googleAnalyticTrackingId: process.env.GA_TRACKING_ID || 'UA-XXXXXXXXX-X',
  education: [
    {
      date: 'Sept. 2018 - Aug. 2022',
      icon: 'university',
      title: 'B.S.E. in Electrical and Computer Engineering (minor in Computer Science)',
      location: 'Shanghai Jiao Tong University (UM-SJTU Joint Institute)',
    },
    {
      date: 'Sept. 2015 - June 2018',
      icon: 'school',
      title: 'High School',
      location: 'High School Affiliated to Shanghai Jiao Tong University',
    },
  ],
  interests: [
    {
      icon: 'layer-group',
      title: 'Full Stack Development',
    },
    {
      icon: 'network-wired',
      title: 'Internet of Things',
    },
    {
      icon: ['fab', 'docker'],
      title: 'Container Technology',
    },
    {
      icon: ['fab', 'linux'],
      title: 'Open Source Community',
    },
  ],
  experience: [
    {
      title: 'Job',
      position: 'left',
      data: [
        {
          date: 'Feb. 2022 - Jul. 2022',
          title: 'Software Engineer Intern',
          location: 'Naive Systems',
          description: 'Build a code analyzer and relative DevSecOps products.',
        },
        {
          date: 'June 2021 - Feb. 2022',
          title: 'Research & Development Engineer Intern',
          location: 'Shanghai Zhimian Weiye Technology Co., Ltd.',
          description: 'Full-stack development engineer, technical leader.',
        }
      ],
    },
    {
      title: 'Teaching Assistant',
      position: 'right',
      data: [
        {
          date: 'Sept. 2021 - Dec. 2021',
          title: 'Teaching Assistant of Intro to OS',
          location: 'Shanghai Jiao Tong University',
          description: 'Advisor: Prof. Manuel Charlemagne'
        },
        {
          date: 'Sept. 2020 - Dec. 2020',
          title: 'Teaching Assistant of Intro to Comp.',
          location: 'Shanghai Jiao Tong University',
          description: 'Advisor: Prof. Manuel Charlemagne'
        },
      ],
    },
    {
      title: 'Laboratory',
      position: 'left',
      data: [
        {
          date: 'Mar. 2021 - Feb. 2022',
          title: 'Research Assistant',
          location: 'Intelligent Design and Optimization Research Lab',
          description: 'Advisor: Prof. Mian Li'
        },
        {
          date: 'July 2021 – Sept. 2021',
          title: 'Website Developer',
          location: 'Advanced Network Laboratory',
          description: 'Advisor: Prof. Xiaofeng Gao'
        },
        {
          date: 'March 2019 – Dec. 2019',
          title: 'Research Assistant',
          location: 'Institute of Media, Information, and Network',
          description: 'Advisor: Prof. Weiyao Lin'
        },
      ],
    },
    {
      title: 'Student Organization',
      position: 'right',
      data: [
        {
          date: 'Sept. 2019 – Present',
          title: 'Maintainer, Main Contributor',
          location: 'Fans Of Computer Science',
        },
        {
          date: 'Sept. 2018 – July 2019',
          title: 'Deputy Director',
          location:
            'Technology Department UM-SJTU Joint Institute Student Union',
        },
        {
          date: 'Sept. 2019 - July 2019',
          title: 'Member',
          location: 'Student Science, Technology and Innovation Association',
        },
      ],
    },
    {
      title: 'Coursework',
      position: 'left',
      data: [
        {
          date: 'VE482',
          location: 'Intro to Operating Systems (A+)',
        },
        {
          date: 'VE472',
          location: 'Methods and Tools for big data (A+)',
        },
        {
          date: 'VE281',
          location: 'Data Structures and Algorithms (A)',
        },
        {
          date: 'VE280',
          location: 'Programming and Elem. Data Structures (A+)',
        },
        {
          date: 'VE450',
          location: 'Major Design Experience (A)',
        },
        {
          date: 'VE490',
          location: 'Undergraduate Research (A)',
        },
        {
          date: 'VG101',
          location: 'Intro to Computers and Programming (A+)',
        },
        {
          date: 'VG100',
          location: 'Intro to Engineering (A)',
        },
      ],
    },
  ],
  awards: [
    {
      date: 'Nov. 2021',
      title: '2020-2021 Undergraduate Excellent Scholarship',
    },
    {
      date: 'June 2019',
      title:
        'Outstanding Member of Technology Department UM-SJTU Joint Institute Student Union',
    },
  ],
  tagColors: [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ],
  tags: [
    {
      id: 'javascript',
      name: 'javascript',
      description:
        'JavaScript is an object-oriented programming language used alongside HTML and CSS to give functionality to web pages.',
      color: '#f0da50',
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      description:
        'Node.js is a tool for executing JavaScript in a variety of environments.',
      color: '#90c53f',
    },
    {
      id: 'rxjs',
      name: 'RxJS',
      description:
        'RxJS is a library for reactive programming using Observables, for asynchronous operations.',
      color: '#eb428e',
    },
    {
      id: 'typescript',
      name: 'typescript',
      description:
        'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
      color: '#257acc',
    },
    {
      id: 'reactjs',
      name: 'reactjs',
      description:
        'React is an open source JavaScript library used for designing user interfaces.',
      color: '#61dbfa',
    },
    {
      id: 'gatsby',
      name: 'Gatsby.js',
      description:
        'A framework built over ReactJS to generate static page web application.  ',
      color: '#6f309f',
    },
    {
      id: 'html',
      name: 'HTML',
      description:
        'A markup language that powers the web. All websites use HTML for structuring the content.',
      color: '#dd3431',
    },
    {
      id: 'css',
      name: 'css',
      description:
        'CSS is used to style the HTML element and to give a very fancy look for the web application.',
      color: '#43ace0',
    },
    {
      id: 'python',
      name: 'python',
      description:
        'A general purpose programming language that is widely used for developing various applications.',
      color: '#f9c646',
    },
  ],
};
