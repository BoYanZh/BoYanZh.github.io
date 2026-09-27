import { Col, FlexboxGrid } from 'rsuite';
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
        internal: {
          contentFilePath: { regex: "/project\/.*\/index\\.mdx?$/" }
        }
        frontmatter: { 
          selected: { eq: true } 
        }
      }
      sort: [{frontmatter: {priority: ASC}}, {frontmatter: {title: ASC}}]
    ) {
      edges {
        node {
          frontmatter {
            cover {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  width: 320
                  height: 180
                  transformOptions: {
                    fit: CONTAIN
                  }
                )
              }
            }
          }
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
          internal {
            contentFilePath
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
      <FlexboxGrid className="spacing-grid">
        {data.allMdx &&
          data.allMdx.edges.map((val, key) => (
            // eslint-disable-next-line react/no-array-index-key
            <FlexboxGrid.Item as={Col} xs={24} sm={24} md={24} lg={24}>
              <ProjectCard data={val} tagsMap={tagsMap} />
            </FlexboxGrid.Item>
          ))}
      </FlexboxGrid>
    </div>
  ) : (
    <></>
  );
};

export default SelectedProject;
