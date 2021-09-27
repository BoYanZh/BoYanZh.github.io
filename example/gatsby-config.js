const config = require('./config');

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-academic',
      options: {
        contentPath: 'content',
        googleAnalyticTrackingId: 'UA-XXXXXXXXX-X',
        defaultLanguage: 'en',
        pages: config.pages,
        tagColors: config.tagColors,
        author: config.author,
      },
    },
  ],
  siteMetadata: config,
  pathPrefix: config.pathPrefix,
};
