const config = require('./config');

module.exports = [
  'gatsby-plugin-react-helmet',
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  'gatsby-plugin-less',
  'gatsby-plugin-offline',
  'gatsby-plugin-lodash',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'Rolwin Reevan',
      short_name: 'Rolwin Reevan',
      start_url: '/',
      background_color: '#304CFD',
      theme_color: '#304CFD',
      display: 'standalone',
      icon: 'src/images/icon.png', // This path is relative to the root of the site.
      legacy: true, // this will add apple-touch-icon links to <head>. Required for
      // versions prior to iOS 11.3.
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'markdown-pages',
      path: `${__dirname}/content`,
    },
  },
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 1000,
            quality: 80,
            showCaptions: true,
            linkImagesToOriginal: false,
          },
        },
        {
          resolve: 'gatsby-remark-external-links',
          options: {
            rel: 'nofollow',
          },
        },
        'gatsby-remark-prismjs',
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-i18n',
    options: {
      langKeyDefault: config.defaultLanguage,
      useLangKeyLayout: false,
    },
  },
  'gatsby-plugin-sitemap',
  'gatsby-plugin-robots-txt',
  {
    resolve: 'gatsby-plugin-antd',
    options: {
      javascriptEnabled: true,
    },
  },
  {
    resolve: 'gatsby-plugin-eslint-v2',
    options: {
      test: /\.js$|\.jsx$/,
      exclude: /(node_modules|.cache|public)/,
      stages: ['develop'],
      options: {
        emitWarning: true,
        failOnError: false,
      },
    },
  },
  {
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      // The property ID; the tracking code won't be generated without it
      trackingId: config.googleAnalyticTrackingId,
      // Defines where to place the tracking script - `true` in the head and `false` in the body
      head: false,
    },
  },
  {
    resolve: 'gatsby-plugin-nprogress',
    options: {
      // Setting a color is optional.
      color: 'black',
      // Disable the loading spinner.
      showSpinner: true,
    },
  },
  {
    resolve: 'gatsby-plugin-lunr',
    options: {
      languages: [
        {
          // ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
          name: 'en',
          // A function for filtering nodes. () => true by default
          // filterNodes: (node) => node.frontmatter.lang === 'en',
          // Add to index custom entries, that are not actually extracted from gatsby nodes
          // customEntries: [{ title: 'Pictures', content: 'awesome pictures', url: '/pictures' }],
          plugins: [
            (lunr) => (builder) => {
              builder.metadataWhitelist = ['position'];
            },
          ],
        },
        // {
        //   name: 'fr',
        //   filterNodes: (node) => node.frontmatter.lang === 'fr',
        // },
      ],
      // Fields to index. If store === true value will be stored in index file.
      // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
      fields: [
        { name: 'title', store: true, attributes: { boost: 20 } },
        { name: 'content', store: true },
        { name: 'url', store: true },
      ],
      // How to resolve each field's value for a supported node type
      resolvers: {
        // For any node of type MarkdownRemark, list how to resolve the fields' values
        MarkdownRemark: {
          title: (node) => node.frontmatter.title,
          content: (node) => node.rawMarkdownBody,
          url: (node) => node.frontmatter.path,
        },
      },
      // custom index file name, default is search_index.json
      filename: 'search_index.json',
      // custom options on fetch api call for search_ındex.json
      fetchOptions: {
        credentials: 'same-origin',
      },
    },
  },
];
