import React from 'react';
import { Layout } from 'antd';
import { graphql } from 'gatsby';
import Header from '../components/PageLayout/Header';

import SidebarWrapper from '../components/PageLayout/Sidebar';
import AboutMe from '../components/PageFragments/HomePage/AboutMe';
import Experience from '../components/PageFragments/HomePage/Experience';
import SelectedResearch from '../components/PageFragments/HomePage/SelectedResearch';
import Awards from '../components/PageFragments/HomePage/Awards';
import Footer from '../components/PageLayout/Footer';

export default ({ data }) => (
  <Layout className="outerPadding">
    <Layout className="container">
      <Header />
      <SidebarWrapper>
        <AboutMe />
        <Experience />
        <Awards />
        <SelectedResearch data={data} />
        <Footer />
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
    allMdx(
      filter: { 
        fileAbsolutePath: { regex: "/research\/.*\/index\\.md$/" }
        fields: { 
          slug: { 
            selected: { eq: true } 
          } 
        }
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
            alternative
          }
          fileAbsolutePath
          fields {
            slug {
              date
              venue
              authors
              path
              title
              tags
              excerpt
              selected
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
