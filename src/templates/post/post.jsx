import React from 'react';
import { Layout } from 'antd';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Header from '../../components/PageLayout/Header';
import SidebarWrapper from '../../components/PageLayout/Sidebar';
import SEO from '../../components/Seo';
// import Comment from '../../components/Comment';
// import Config from '../../../config';
import Utils from '../../utils/pageUtils';

import 'prismjs/themes/prism-solarizedlight.css';
import './highlight-syntax.less';
import style from './post.module.less';

const Post = ({ data }) => {
  Utils.generateOmittedPostInfo(data.markdownRemark);
  const { html, frontmatter } = data.markdownRemark;
  const {
    title, cover, excerpt, path,
  } = frontmatter;
  const fluid = cover ? cover.childImageSharp.fluid : null;

  /*  const canonicalUrl = Utils.resolvePageUrl(
    Config.siteUrl,
    Config.pathPrefix,
    path,
  ); */
  return (
    <Layout className="outerPadding">
      <Layout className="container">
        <SEO
          title={title}
          description={excerpt}
          path={path}
          keywords={['Rolwin', 'Reevan', 'Monteiro', 'FullStack developer', 'Javascript', 'ReactJS', 'NodeJS', 'Gatsby', 'technology']}
        />
        <Header />
        <SidebarWrapper>
          <div className="marginTopTitle">
            <h1>{title}</h1>
            <div className={style.bannerImgContainer}>
              {fluid ? <Img className={style.bannerImg} fluid={fluid} title={excerpt} alt={title} />
                : <Img className={style.bannerImg} fixed title={excerpt} alt={title} />}
            </div>
            <article className={style.blogArticle} dangerouslySetInnerHTML={{ __html: html }} />
            {/* <Comment pageCanonicalUrl={canonicalUrl} pageId={title} /> */}
          </div>
        </SidebarWrapper>
      </Layout>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($fileAbsolutePath: String!, $postPath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
        tags
        path
        excerpt
        cover {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
      fileAbsolutePath
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { path: { ne: $postPath } }
        fileAbsolutePath: { regex: "/index.md$/" }
      }
    ) {
      edges {
        node {
          frontmatter {
            path
            title
            tags
            excerpt
            cover {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default Post;
