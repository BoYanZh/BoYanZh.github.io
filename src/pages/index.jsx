import React from 'react';
import { Layout } from 'antd';
import { graphql } from 'gatsby';
import Header from '../components/PageLayout/Header';

import SidebarWrapper from '../components/PageLayout/Sidebar';
import AboutMe from '../components/PageFragments/HomePage/AboutMe';
import Experience from '../components/PageFragments/HomePage/Experience';
import SelectedResearch from '../components/PageFragments/HomePage/SelectedResearch';
import Awards from '../components/PageFragments/HomePage/Awards';

export default ({ data }) => (
  <Layout className="outerPadding">
    <Layout className="container">
      <Header />
      <SidebarWrapper>
        <>
          <AboutMe />
          <Experience />
          <SelectedResearch data={data} />
          <Awards />
        </>
      </SidebarWrapper>
    </Layout>
  </Layout>
);

export const query = graphql`
  {
    allTag {
      edges {
        node {
          name
          color
          path
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { 
        fileAbsolutePath: { regex: "/research\/.*\/index\\.md$/" }
        fields: { parsed: { selected: { eq: true } } }
      }
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
              selected
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
