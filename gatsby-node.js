/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */

/* Vendor imports */
const path = require('path');
const fs = require('fs-extra');
const crypto = require('crypto');
const _ = require('lodash');
const execa = require('execa');
const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');
const slash = require('slash');
// const isRelativeUrl = require('is-relative-url');

/* App imports */
const config = require('./config');
const utils = require('./src/utils/pageUtils');

const EXCERPT_MAX_LENGTH = config.excerptMaxLength || 500;

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

const getCommitTime = (filePath) => {
  try {
    const timestamp = execa.sync('git',
      ['log', '-n', '1', '--pretty=format:%at', filePath]).stdout;
    return parseInt(timestamp, 10);
  } catch (err) {
    return 0;
  }
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
      allMdx(sort: {order: DESC, fields: [frontmatter___date]}) {
        edges {
          node {
            body
            frontmatter {
              title
              tags
              date
              path
              excerpt
              venue
              authors
              selected
              password
              links {
                name
                file
                url
              }
            }
            fileAbsolutePath
            id
          }
        }
      }
      allFile {
        edges {
          node {
            internal {
              contentDigest
            }
            name
            base
            absolutePath
          }
        }
      }
    }    
  `).then((result) => {
    if (result.errors) return Promise.reject(result.errors);

    const { allMdx, allFile } = result.data;
    const filePathMap = {};
    allFile.edges.forEach(({ node }) => {
      const { absolutePath } = node;
      filePathMap[absolutePath] = node;
    });

    const tags = {};

    /* Post and Research pages */
    allMdx.edges.forEach(({ node }) => {
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
      data.venue = frontmatter.venue || '';
      data.authors = frontmatter.authors || [];
      data.selected = frontmatter.selected || false;
      data.priority = frontmatter.priority || 0;
      data.links = [];
      data.commit = getCommitTime(node.fileAbsolutePath);
      if (frontmatter.path.indexOf(config.pages.posts) === 0) {
        data.type = 'posts';
      } else if (frontmatter.path.indexOf(config.pages.research) === 0) {
        data.type = 'research';
      }

      // encrypt post with password
      if (frontmatter.password) {
        const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
        const message = nacl.util.decodeUTF8(node.body);
        const password = nacl.util.decodeUTF8(frontmatter.password);
        const key = nacl.hash(password).slice(0, nacl.secretbox.keyLength);
        const htmlEncrypted = nacl.secretbox(message, nonce, key);
        data.html = '';
        data.htmlEncrypted = nacl.util.encodeBase64(htmlEncrypted);
        data.nonce = nacl.util.encodeBase64(nonce);
      } else {
        data.html = node.body;
        data.htmlEncrypted = '';
        data.nonce = '';
      }

      if (frontmatter.links) {
        for (const link of frontmatter.links) {
          if (link.name) {
            if (link.file) {
              const filePath = slash(path.resolve(path.dirname(node.fileAbsolutePath), link.file));
              if (filePath in filePathMap) {
                const fileNode = filePathMap[filePath];
                const { contentDigest } = fileNode.internal;
                const destFileDir = path.posix.join('public', 'files', contentDigest);
                const destFilePath = path.posix.join(destFileDir, fileNode.base);
                const urlFilePath = utils.resolveUrl('files', contentDigest, fileNode.base);
                fs.ensureDirSync(destFileDir);
                fs.copyFileSync(fileNode.absolutePath, destFilePath);
                data.links.push({
                  name: link.name,
                  url: urlFilePath,
                });
              }
            } else if (link.url) {
              data.links.push({
                name: link.name,
                url: link.url,
              });
            }
          }
        }
      }

      /* if (link.file && link.file.internal && link.file.base && link.file.absolutePath) {
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
            } */

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
        name: 'slug',
        value: data,
      });

      createPage({
        path: frontmatter.path,
        component: path.resolve('src/templates/post/post.jsx'),
        context: {
          fileAbsolutePath: node.fileAbsolutePath,
          postPath: frontmatter.path,
          translations: utils.getRelatedTranslations(node, allMdx.edges),
        },
      });
    });

    // const regexForIndex = /index\.md$/;
    // Posts in default language, excluded the translated versions
    // const defaultPosts = allMdx.edges
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

    // const statistics = {
    //   tags,
    //   git: getGitInfo(),
    // };

    // fs.writeFileSync('content/statistics.json', JSON.stringify(statistics, null, 2));

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
    //   name: 'slug',
    //   value: data,
    // });
  } */
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }
    type Fields {
      slug: Slug
    }
    type Slug {
      title: String
      tags: [String]
      date: String
      path: String
      excerpt: String
      venue: String
      authors: [String]
      links: [Link]
      commit: Int
      type: String
      selected: Boolean
      html: String
      htmlEncrypted: String
      nonce: String
      priority: Int
    }
    type Link {
      name: String!
      url: String
      file: String
    }
    type Tag implements Node {
      name: String
      description: String
      path: String
      color: String
      count: Int
      research: Boolean
      posts: Boolean
    }
  `;
  const FrontmatterDef = schema.buildObjectType({
    name: 'Frontmatter',
    fields: {
      title: {
        type: 'String',
        resolve: (source) => source.title || '',
      },
      tags: {
        type: '[String]',
        resolve: (source) => source.tags || [],
      },
      date: {
        type: 'String',
        resolve: (source) => source.date || '',
      },
      path: 'String',
      type: {
        type: 'String',
        // eslint-disable-next-line consistent-return
        resolve: (source) => {
          if (source.path.indexOf(config.pages.posts) === 0) {
            return 'posts';
          }
          if (source.path.indexOf(config.pages.research) === 0) {
            return 'research';
          }
          return '';
        },
      },
      excerpt: {
        type: 'String',
        resolve: (source) => {
          if (!source.excerpt) return '';
          if (source.excerpt.length < EXCERPT_MAX_LENGTH) return source.excerpt;
          return `${source.excerpt.substring(0, EXCERPT_MAX_LENGTH)} ...`;
        },
      },
      venue: {
        type: 'String',
        resolve: (source) => source.venue || '',
      },
      authors: {
        type: '[String]',
        resolve: (source) => {
          const authors = source.authors || [];
          return authors.map((author) => {
            if (typeof author === 'string') {
              return author;
            }
            if (!author.url) {
              return author.name;
            }
            return `[${author.name}](${author.url})`;
          });
        },
      },
      selected: {
        type: 'Boolean',
        resolve: (source) => source.selected || false,
      },
      password: {
        type: 'String',
        resolve: (source) => source.password || '',
      },
      links: {
        type: '[Link]',
        resolve: (source) => source.links || [],
      },
      priority: {
        type: 'Int',
        resolve: (source) => source.priority || 0,
      },
    },
  });

  /* const AuthorDef = schema.buildObjectType({
    name: 'Author',
    infer: false,
    fields: {
      name: 'String',
      url: 'String',
      slug: {
        type: 'String',
        resolve: (source, args, context, info) => {
          if (typeof source === 'string') {
            return source;
          }
          if (!source.url) {
            return source.name;
          }
          return `[${source.name}](${source.url})`;
        },
      },
    },
  }); */
  // const fileDef = schema.buildObjectType({
  //   name: 'File',
  //   id: {
  //     type: 'String!',
  //     resolve(source, args, context, info) {
  //       // For a more generic solution, you could pick the field value from
  //       // `source[info.fieldName]`
  //       if (source.id == null) {
  //         return '';
  //       }
  //       return source.id;
  //     },
  //   },
  // });
  createTypes([FrontmatterDef, typeDefs]);
};
