const config = require('./config');

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-academic',
      options: {
        contentPath: 'content',
        googleAnalyticTrackingId: config.googleAnalyticTrackingId,
        defaultLanguage: config.defaultLanguage,
        pages: config.pages,
        tagColors: config.tagColors,
        author: config.author,
        icon: './static/favicon.png',
      },
    },
  ],
  siteMetadata: config,
  pathPrefix: config.pathPrefix,
};
