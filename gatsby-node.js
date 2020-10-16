/* Vendor imports */
const path = require('path');
const fs = require('fs-extra');
const crypto = require('crypto');
const _ = require('lodash');
const execa = require('execa');
// const isRelativeUrl = require('is-relative-url');

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
};

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

const mapAbsolutePathToNode = new Map();

const getNodeByAbsolutePath = (absolutePath) => {
  if (mapAbsolutePathToNode.has(absolutePath)) {
    return mapAbsolutePathToNode.get(absolutePath);
  }
  return null;
};

exports.createPages = ({ actions, getNode, graphql }) => {
  const { createPage, createNode, createNodeField } = actions;

  return graphql(`
    {
      allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
        edges {
          node {
            frontmatter {
              path
              tags
              links {
                name
                file {
                  internal {
                    contentDigest
                  }
                  base
                  absolutePath
                }
              }
            }
            fileAbsolutePath
            id
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
      const { frontmatter } = node;

      // utils.generateOmittedPostInfo(node);
      // Check path prefix of Tag
      if (frontmatter.path.indexOf(config.pages.tags) === 0) {
        const tag = _.last(frontmatter.path.split('/'));
        if (!(tag in tags)) {
          tags[tag] = {
            count: 0,
            path: '',
            research: false,
            posts: false,
          };
        }
        if (!tags[tag].path) {
          tags[tag].path = createTagPage(createPage, tag, node);
        }
        return;
      }
      // Check path prefix of Post and Research
      if (frontmatter.path.indexOf(config.pages.posts) !== 0
        && frontmatter.path.indexOf(config.pages.research) !== 0) {
        // eslint-disable-next-line no-throw-literal
        throw `Invalid path prefix: ${frontmatter.path}`;
      }

      const data = {};
      data.title = frontmatter.title || '';
      data.tags = frontmatter.tags || [];
      data.date = frontmatter.date || '';
      data.path = frontmatter.path;
      data.excerpt = frontmatter.excerpt || '';
      data.links = [];

      if (frontmatter.links) {
        for (const link of frontmatter.links) {
          if (link.name) {
            if (link.file && link.file.internal && link.file.base && link.file.absolutePath) {
              const { contentDigest } = link.file.internal;
              const destFileDir = path.posix.join('public', 'files', contentDigest);
              const destFilePath = path.posix.join(destFileDir, link.file.base);
              const urlFilePath = utils.resolveUrl('files', contentDigest, link.file.base);
              fs.ensureDirSync(destFileDir);
              fs.copyFileSync(link.file.absolutePath, destFilePath);
              data.links.push({
                name: link.name,
                url: urlFilePath,
              });
            }
          }
        }
      }

      if (frontmatter.tags) {
        for (let i = 0; i < frontmatter.tags.length; i++) {
          const tag = frontmatter.tags[i];
          if (!(tag in tags)) {
            tags[tag] = {
              count: 0,
              path: '',
              research: false,
              posts: false,
            };
          }
          tags[tag].count++;
          if (frontmatter.path.indexOf(config.pages.posts) === 0) {
            tags[tag].posts = true;
          } else if (frontmatter.path.indexOf(config.pages.research) === 0) {
            tags[tag].research = true;
          }
        }
      }

      const internalNode = getNode(node.id);
      // console.log(node.id);
      // console.log(internalNode.internal);
      createNodeField({
        node: internalNode,
        name: 'parsed',
        value: data,
      });

      createPage({
        path: frontmatter.path,
        component: path.resolve('src/templates/post/post.jsx'),
        context: {
          fileAbsolutePath: node.fileAbsolutePath,
          postPath: frontmatter.path,
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
    //   frontmatter.tags.forEach((tag) => {
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

    for (const tag in tags) {
      const contentDigest = crypto
        .createHash('md5')
        .update(JSON.stringify(tags[tag]))
        .digest('hex');
      createNode({
        name: tag,
        ...tags[tag],
        id: `tag-${tag}`,
        parent: null,
        children: [],
        internal: {
          type: 'Tag',
          contentDigest,
        },
      });
    }

    const statistics = {
      tags,
      git: getGitInfo(),
    };

    fs.writeFileSync('content/statistics.json', JSON.stringify(statistics, null, 2));

    return 1;
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'File') {
    if (node.absolutePath) {
      mapAbsolutePathToNode.set(node.absolutePath, node);
    }
  }
/*  else if (node.internal.type === 'MarkdownRemark') {
    const { frontmatter } = node;
    const data = {};
    data.title = frontmatter.title || '';
    data.tags = frontmatter.tags || [];
    data.date = frontmatter.date || '';
    data.path = frontmatter.path;
    data.excerpt = frontmatter.excerpt || '';
    data.links = [];
    if (frontmatter.links) {
      for (const link of frontmatter.links) {
        if (link.name) {
          let href = '';
          console.log(link.url);
          if (
            isRelativeUrl(link.url)
            && getNode(node.parent).internal.type === 'File'
          ) {
            const linkPath = path.posix.join(
              getNode(node.parent).dir,
              link.url,
            );
            const fileNode = getNodeByAbsolutePath(linkPath);
            console.log(linkPath, fileNode);
          }
          // if (link.file) {
          //   const linkPath = path.posix.join(
          //     getNode(markdownNode.parent).dir,
          //     link.url,
          //   );
          //   console.log(link.file);
          // } else if (link.href) {
          //   href = link.href;
          // }
          // data.links.push({
          //   name: link.name,
          //   href,
          // });
        }
      }
    }
    // console.log(node);
    // createNodeField({
    //   node,
    //   name: 'parsed',
    //   value: data,
    // });
  } */
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemark implements Node {
      fields: Fields!
    }
    type Fields {
      parsed: Parsed!
    }
    type Parsed {
      title: String
      tags: [String!]!
      date: String!
      path: String
      excerpt: String!
      links: [Link!]!
    }
    type Link {
      name: String
      url: String!
    }
    type Tag implements Node {
      name: String
      path: String
      color: String
      count: Int
      research: Boolean
      posts: Boolean
    }
  `;
  createTypes(typeDefs);
};
