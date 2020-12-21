import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Layout } from 'antd';
import Header from '../../components/PageLayout/Header';

import SidebarWrapper from '../../components/PageLayout/Sidebar';
import Panel from '../../components/Panel';
import SEO from '../../components/Seo';

const Research = ({ data }) => (
  <Layout className="outerPadding">
    <Layout className="container">
      <Header />
      <SEO
        title="Research"
        description="I like blogging about various web technologies and other stuff related to
          javascript and other trends like graphql, prisma etc. This blog expresses my views of various technologies
          and scenarios I have come across in realtime."
        path="research"
      />
      <SidebarWrapper>
        <div className="marginTopTitle">
          <h1 className="titleSeparate">Research</h1>
          <Panel type="research" data={data} />
        </div>
      </SidebarWrapper>
    </Layout>
  </Layout>
);

Research.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  {
    allTag(
      sort: { fields: [count], order: DESC },
      filter: { research: { eq: true } }
    ) {
      edges {
        node {
          name
          color
          path
        }
      }
    }
    allMarkdownRemark(
      filter: { 
        fileAbsolutePath: { regex: "/research\/.*\/index\\.md$/" }
      }
      sort: { fields: [frontmatter___priority, frontmatter___title], order: ASC }
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
            priority
            title
          }
          fileAbsolutePath
          fields {
            parsed {
              date
              venue
              authors
              path
              title
              tags
              excerpt
              priority
              links {
                name
                url
              }
            }
          }
        }
      }
    }
  }
`;

export default Research;
