import { Col, Row } from 'antd';
import { useStaticQuery, graphql } from 'gatsby';
import _ from 'lodash';
import React from 'react';

import ProjectCard from '../../ProjectCard';

import * as styles from './homePage.module.less';

const SelectedProject = () => {
  const data = useStaticQuery(graphql`
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
            date
            venue
            authors
            path
            title
            tags
            excerpt
            selected
            priority
          }
          fileAbsolutePath
          fields {
            slug {
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
`);

  const tags = data.allTag ? data.allTag.edges : [];
  const tagsMap = _.mapValues(_.keyBy(tags, (tag) => tag.node.name), 'node');
  return (data.allMdx && data.allMdx.edges && data.allMdx.edges.length) ? (
    <div className={styles.homepageSection}>
      <h2 style={{ marginBottom: '1rem' }}>Selected Project</h2>
      <Row gutter={[20, 20]}>
        {data.allMdx &&
          data.allMdx.edges.map((val, key) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col key={key} xs={24} sm={24} md={24} lg={24}>
              <ProjectCard data={val} tagsMap={tagsMap} />
            </Col>
          ))}
      </Row>
    </div>
  ) : (
    <></>
  );
};

export default SelectedProject;
