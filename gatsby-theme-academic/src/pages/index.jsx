import { Layout } from 'antd';
import { graphql } from 'gatsby';
import React from 'react';

import AboutMe from '../components/PageFragments/HomePage/AboutMe';
import Awards from '../components/PageFragments/HomePage/Awards';
import Experience from '../components/PageFragments/HomePage/Experience';
import SelectedProject from '../components/PageFragments/HomePage/SelectedProject';
import Footer from '../components/PageLayout/Footer';
import Header from '../components/PageLayout/Header';
import SidebarWrapper from '../components/PageLayout/Sidebar';

export default ({ data }) => (
  <Layout className="outerPadding">
    <Layout className="container">
      <Header />
      <SidebarWrapper>
        <AboutMe />
        <Experience />
        <Awards />
        <SelectedProject data={data} />
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
        fileAbsolutePath: { regex: "/project\/.*\/index\\.md$/" }
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
