/* eslint-disable react/forbid-prop-types */
/* Vendor imports */
import {
  Layout, Row, Col,
} from 'antd';
import { graphql } from 'gatsby';
// import Img from 'gatsby-image';
/* App imports */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import Header from '../../components/PageLayout/Header';
import SidebarWrapper from '../../components/PageLayout/Sidebar';
import PostCard from '../../components/PostCard';
// import Statistics from '../../../content/statistics.json';
import ProjectCard from '../../components/ProjectCard';
import SEO from '../../components/Seo';
import Utils from '../../utils/pageUtils';

import * as style from './tags.module.less';

const TagPage = ({
  data,
  pageContext,
}) => {
  const tagName = pageContext.tag;
  // const { tag } = pageContext;
  // const tagName = Statistics.tags[tag].name || tag;
  // const tagPagePath = siteMetadata.pages.tags;
  // const tagImage = data.allFile.edges.find((edge) => edge.node.name === tag).node
  //   .childImageSharp.fluid;
  const docs = data.allMdx.edges;
  const posts = _.filter(docs, (doc) => doc.node.fields.slug.type === 'posts');
  const project = _.filter(docs, (doc) => doc.node.fields.slug.type === 'project');
  const tags = data.allTag ? data.allTag.edges : [];
  const tagsMap = _.mapValues(_.keyBy(tags, (tag) => tag.node.name), 'node');

  const tag = tagsMap[tagName];
  const tagPagePath = tag ? tag.path : '#';
  const tagDescription = tag ? tag.description : '';

  return (
    <Layout className="outerPadding">
      <Layout className="container">
        <Header />
        <SEO
          title={tagName}
          description={`All post about ${tagName}. ${tagDescription} `}
          path={Utils.resolvePageUrl(tagPagePath, tag)}
          keywords={[tagName]}
        />
        <SidebarWrapper>
          <div className={`marginTopTitle ${style.tagsList}`}>
            <h1 className="titleSeparate">
              #
              {tagName}
            </h1>
            {/* <div className={style.bannerImgContainer}> */}
            {/*  <Img className={style.bannerImg} fluid={tagImage} alt={tagName} /> */}
            {/* </div> */}
            <h4 className="textCenter">
              {tagDescription}
            </h4>
          </div>
          {project.length > 0 ? (
            <>
              <h2>Project</h2>
              <Row gutter={[20, 20]}>
                {project.map((post, key) => (
                // eslint-disable-next-line react/no-array-index-key
                  <Col key={key} xs={24} sm={24} md={24} lg={24}>
                    <ProjectCard data={post} tagsMap={tagsMap} />
                  </Col>
                ))}
              </Row>
              ,
            </>
          ) : null}
          {posts.length > 0 ? (
            <>
              <h2>Posts</h2>
              <Row gutter={[20, 20]}>
                {posts.map((post, key) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Col key={key} xs={24} sm={24} md={12} lg={8}>
                    <PostCard data={post} tagsMap={tagsMap} />
                  </Col>
                ))}
              </Row>
              ,
            </>
          ) : null}
        </SidebarWrapper>
      </Layout>
    </Layout>
  );
};

TagPage.propTypes = {
  data: PropTypes.shape({
    allTag: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            color: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            path: PropTypes.string,
          }),
        }),
      ).isRequired,
    }).isRequired,
    allMdx: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    allFile: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string.isRequired,
            childImageSharp: PropTypes.shape({
              fluid: PropTypes.object.isRequired,
            }).isRequired,
          }).isRequired,
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query($tag: String!) {
    allTag {
      edges {
        node {
          color
          name
          description
          path
        }
      }
    }
    allMdx(
      filter: {
        fields: { slug: { tags: { in: [$tag] } } }
        fileAbsolutePath: { regex: "/index.md$/" }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            cover {
              childImageSharp {
                fluid(maxWidth: 320, maxHeight: 180, fit: CONTAIN, background: "rgba(0,0,0,0)") {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
            date
            venue
            authors
            path
            title
            tags
            excerpt
          }
          fields {
            slug {
              links {
                name
                url
              }
              type
            }
          }
        }
      }
    }
    allFile(filter: { name: { eq: $tag }, dir: { regex: "/tags$/" } }) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxHeight: 600) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;

export default TagPage;
