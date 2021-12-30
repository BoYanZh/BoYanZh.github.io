module.exports = {
  pathPrefix: '',
  siteUrl: 'https://boyanzh.site',
  title: 'BoYanZh',
  description: 'Personal Website of BoYanZh',
  author: 'Boming ZHANG',
  authorAlternative: '张泊明',
  introduction: [
    'Hi there, I am BoYanZh (Boming Zhang). I am a software developer from China.',
    'I have built lots of useful tools and platforms. They mainly aims at making the life of students easier in UM-SJTU JI, which is my undergradute institue.',
    'I am keen on writing high quality, readable, and maintainable codes, with the help of check tools. Also, automating the whole process of writing to deployment with CI/CD is one of my interests.',
    'I like to build softwares with real world impact and being accssible by everyone and everywhere. So I have a lot of Web projects, working mainly on the backend side with `Python` and `Go`, creating modern RESTful API. However, my interest currently diverges from building CRUD(Create, Read, Update, Delete) endpoints repeatedly with frameworks. I am trying to diving deeper and deeper into the backend side.',
  ],
  avatar: 'avatar.png',
  professions: [
    'Undergradute Student',
    'Full Stack Developer',
  ],
  tocMaxDepth: 2,
  excerptMaxLength: 500,
  birthday: 'Mar. 16, 2000',
  location: 'Shanghai, China',
  email: 'bomingzh@sjtu.edu.cn',
  postsForArchivePage: 3,
  defaultLanguage: 'en',
  disqusScript: process.env.DISQUS_SCRIPT
    || 'https://boyanzh.disqus.com/embed.js',
  pages: {
    home: '/',
    posts: 'posts',
    contact: 'contact',
    resume: 'resume',
    tags: 'tags',
    research: 'research',
    wakatime: 'wakatime',
  },
  social: [
    {
      url: '/resume.pdf',
      icon: ['ai', 'cv'],
    }, {
      url: 'https://github.com/BoYanZh',
      icon: ['fab', 'github'],
    }, {
      url: 'https://t.me/BoYanZh',
      icon: ['fab', 'telegram'],
    }, {
      url: 'https://steamcommunity.com/id/boyanzh',
      icon: ['fab', 'steam'],
    }, {
      url: '/wakatime',
      icon: ['clock'],
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
  googleAnalyticTrackingId: process.env.GA_TRACKING_ID || '',
  education: [
    {
      date: 'Sept. 2018 - Present',
      icon: 'university',
      title: 'B.S.E. in Electrical and Computer Engineering',
      location: 'Shanghai Jiao Tong University (UM-SJTU Joint Institute)',
    }, {
      date: 'Sept. 2015 - June 2018',
      icon: 'school',
      title: 'High School',
      location: 'High School Affiliated to Shanghai Jiao Tong University',
    }],
  interests: [
    {
      icon: 'layer-group',
      title: 'Full Stack Development',
    }, {
      icon: 'network-wired',
      title: 'Internet of Things',
    }, {
      icon: ['fab', 'linux'],
      title: 'Open Source Community',
    }],
  experience: [
    {
      title: 'Work',
      position: 'left',
      data: [
        {
          date: 'Aug 2019 - Present',
          title: 'Software Engineer',
          location: 'Somewhere',
          description: 'description',
        },
      ],
    }, {
      title: 'Teaching',
      position: 'right',
      data: [
        {
          date: 'Aug 2019',
          title: 'Teaching Assistant of XXX',
          location: 'Somewhere',
        }, {
          date: 'Aug 2018',
          title: 'Teaching Assistant of XXX',
          location: 'Somewhere',
        }, {
          date: 'Aug 2017',
          title: 'Teaching Assistant of XXX',
          location: 'Somewhere',
        }, {
          date: 'Aug 2018',
          title: 'Teaching Assistant of XXX',
          location: 'Somewhere',
        }, {
          date: 'Aug 2017',
          title: 'Teaching Assistant of XXX',
          location: 'Somewhere',
        },
      ],
    }, {
      title: 'Volunteer',
      position: 'left',
      data: [
        {
          date: 'Aug 2019',
          title: '[fxh](https://github.com/Reapor-Yurnero) home visit third time',
          location: 'Somewhere',
        }, {
          date: 'Aug 2018',
          title: '[fxh](https://github.com/Reapor-Yurnero) home visit second time',
          location: 'Somewhere',
        }, {
          date: 'Aug 2017',
          title: '[fxh](https://github.com/Reapor-Yurnero) home visit\n\n111',
          location: 'Somewhere',
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
      title: 'Outstanding Member of Technology Department UM-SJTU Joint Institute Student Union',
    },
  ],
  tagColors: [
    'magenta', 'red', 'volcano', 'orange', 'gold',
    'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple',
  ],
  tags: [
    {
      id: 'javascript',
      name: 'javascript',
      description: 'JavaScript is an object-oriented programming language used alongside HTML and CSS to give functionality to web pages.',
      color: '#f0da50',
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      description: 'Node.js is a tool for executing JavaScript in a variety of environments.',
      color: '#90c53f',
    },
    {
      id: 'rxjs',
      name: 'RxJS',
      description: 'RxJS is a library for reactive programming using Observables, for asynchronous operations.',
      color: '#eb428e',
    },
    {
      id: 'typescript',
      name: 'typescript',
      description: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
      color: '#257acc',
    },
    {
      id: 'reactjs',
      name: 'reactjs',
      description: 'React is an open source JavaScript library used for designing user interfaces.',
      color: '#61dbfa',
    },
    {
      id: 'gatsby',
      name: 'Gatsby.js',
      description: 'A framework built over ReactJS to generate static page web application.  ',
      color: '#6f309f',
    },
    {
      id: 'html',
      name: 'HTML',
      description: 'A markup language that powers the web. All websites use HTML for structuring the content.',
      color: '#dd3431',
    },
    {
      id: 'css',
      name: 'css',
      description: 'CSS is used to style the HTML element and to give a very fancy look for the web application.',
      color: '#43ace0',
    },
    {
      id: 'python',
      name: 'python',
      description: 'A general purpose programming language that is widely used for developing various applications.',
      color: '#f9c646',
    },
  ],
};
