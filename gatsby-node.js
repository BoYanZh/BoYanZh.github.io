/* Vendor imports */
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const execa = require('execa');

/* App imports */
const config = require('./config');
const utils = require('./src/utils/pageUtils');

const getGitInfo = () => {
  const gitHash = execa.sync('git', ['rev-parse', '--short', 'HEAD']).stdout;
  const gitNumCommits = Number(execa.sync('git', ['rev-list', 'HEAD', '--count']).stdout);
  const gitDirty = execa.sync('git', ['status', '-s', '-uall']).stdout.length > 0;
  return {
    hash: gitHash,
    commits: gitNumCommits,
    dirty: gitDirty,
  };
}

const createTagPage = (createPage, tag, node) => {
  let tagPath;
  if (node && node.frontmatter.path) {
    tagPath = utils.resolvePageUrl(node.frontmatter.path);
  } else {
    tagPath = utils.resolvePageUrl(config.pages.tags, tag);
  }
  createPage({
    path: tagPath,
    component: path.resolve('src/templates/tags/index.jsx'),
    context: {
      fileAbsolutePath: node ? node.fileAbsolutePath : '',
      tag,
    },
  });
  return tagPath;
};

const processTags = (tags) => {
  const { tagColors } = config;
  const arr = _(tags).map((value, key) => ({
    ...value,
    name: key,
  })).orderBy(['count', 'name'], ['desc', 'asc']).value();
  if (arr.length > 0) {
    const chunkSize = Math.ceil(arr.length / tagColors.length);
    const chunks = _.chunk(arr, chunkSize);
    _.forEach(chunks, (value, index) => {
      _.forEach(value, ({ name }) => {
        // eslint-disable-next-line no-param-reassign
        tags[name].color = tagColors[index];
      });
    });
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
        edges {
          node {
            frontmatter {
              path
              tags
            }
            fileAbsolutePath
          }
        }
      }
    }    
  `).then((result) => {
    if (result.errors) return Promise.reject(result.errors);

    const { allMarkdownRemark } = result.data;
    const tags = {};

    /* Post and Research pages */
    allMarkdownRemark.edges.forEach(({ node }) => {
      utils.generateOmittedPostInfo(node);
      // Check path prefix of Tag
      if (node.frontmatter.path.indexOf(config.pages.tags) === 0) {
        const tag = _.last(node.frontmatter.path.split('/'));
        if (!(tag in tags)) {
          tags[tag] = {
            count: 0,
            path: '',
          };
        }
        if (!tags[tag].path) {
          tags[tag].path = createTagPage(createPage, tag, node);
        }
        return;
      }
      // Check path prefix of Post and Research
      if (node.frontmatter.path.indexOf(config.pages.posts) !== 0
        && node.frontmatter.path.indexOf(config.pages.research) !== 0) {
        // eslint-disable-next-line no-throw-literal
        throw `Invalid path prefix: ${node.frontmatter.path}`;
      }
      if (node.frontmatter.tags) {
        for (let i = 0; i < node.frontmatter.tags.length; i++) {
          const tag = node.frontmatter.tags[i];
          if (!(tag in tags)) {
            tags[tag] = {
              count: 0,
              path: '',
            };
          }
          tags[tag].count++;
        }
      }

      createPage({
        path: node.frontmatter.path,
        component: path.resolve('src/templates/post/post.jsx'),
        context: {
          fileAbsolutePath: node.fileAbsolutePath,
          postPath: node.frontmatter.path,
          translations: utils.getRelatedTranslations(node, allMarkdownRemark.edges),
        },
      });
    });

    // const regexForIndex = /index\.md$/;
    // Posts in default language, excluded the translated versions
    // const defaultPosts = allMarkdownRemark.edges
    //   .filter(({ node: { fileAbsolutePath } }) => fileAbsolutePath.match(regexForIndex));

    /* Tag pages */
    // const allTags = [];
    // defaultPosts.forEach(({ node }) => {
    //   node.frontmatter.tags.forEach((tag) => {
    //     if (allTags.indexOf(tag) === -1) allTags.push(tag);
    //   });
    // });
    //
    // allTags
    //   .forEach((tag) => {
    //
    //   });

    // eslint-disable-next-line no-restricted-syntax
    for (const tag in tags) {
      if (!tags[tag].path) {
        tags[tag].path = createTagPage(createPage, tag, null);
      }
    }

    processTags(tags);

    const statistics = {
      tags,
      git: getGitInfo(),
    };

    fs.writeFileSync('content/statistics.json', JSON.stringify(statistics, null, 2));

    return 1;
  });
};
