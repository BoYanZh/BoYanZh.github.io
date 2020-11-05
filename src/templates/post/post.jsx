import React from 'react';
import { Layout } from 'antd';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import moment from 'moment';

import 'github-markdown-css';
import 'typeface-jetbrains-mono';
import 'highlight.js/styles/github.css';

import Header from '../../components/PageLayout/Header';
import Footer from '../../components/PageLayout/Footer';
import SidebarWrapper from '../../components/PageLayout/Sidebar';
import SEO from '../../components/Seo';
// import Comment from '../../components/Comment';
// import Utils from '../../utils/pageUtils';

import './highlight-syntax.less';

import style from './post.module.less';

const Post = ({ data }) => {
  const { html, fields: { parsed }, frontmatter: { cover } } = data.markdownRemark;
  const {
    title, excerpt, path, date, commit,
  } = parsed;
  const editTime = moment.unix(commit).format('MMM Do YYYY');
  const postTime = moment(date).format('MMM Do YYYY');

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
            <h1 className="titleSeparate">{title}</h1>
            <div>
              <div style={{ color: 'rgba(0, 0, 0, 0.45)', marginBottom: '1rem' }}>
                {`Posted: ${postTime}`}
                {commit > 0 && postTime !== editTime ? `, Edited: ${editTime}` : ''}
              </div>
            </div>
            { fluid ? (
              <div className={style.bannerImgContainer}>
                <Img className={style.bannerImg} fluid={fluid} title={excerpt} alt={title} />
              </div>
            ) : null }
            <article className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
            {/* <Comment pageCanonicalUrl={canonicalUrl} pageId={title} /> */}
          </div>
          <Footer />
        </SidebarWrapper>
      </Layout>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($fileAbsolutePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      html
      timeToRead
      frontmatter {
        cover {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
      fileAbsolutePath
      fields {
        parsed {
          title
          date
          tags
          path
          excerpt
          links { name }
          commit
        }
      }
    }
  }
`;

export default Post;
