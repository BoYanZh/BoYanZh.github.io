import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import {
  Layout, Row, Col, Tag,
} from 'antd';
import _ from 'lodash';

import Header from '../../components/PageLayout/Header';
import SidebarWrapper from '../../components/PageLayout/Sidebar';
import PostCard from '../../components/PostCard';
// import PostTag from '../../components/PostTag';
import SEO from '../../components/Seo';
import Utils from '../../utils/pageUtils';
import Statistics from '../../../content/statistics.json';

/* eslint-disable no-param-reassign */

const Posts = ({ data }) => {
  const tags = Utils.getTags();
  const [selectedTags, setSelectedTags] = useState(new Set());

  const handleChange = (tagName, checked) => {
    const nextSelectedTags = _.clone(selectedTags);
    if (checked) {
      nextSelectedTags.add(tagName);
    } else {
      nextSelectedTags.delete(tagName);
    }
    console.log('You are interested in: ', nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  const generateTag = (tag) => {
    const isChecked = selectedTags.has(tag.name);
    let className = '';
    if (!isChecked && Statistics.tags[tag.name]) {
      className = `ant-tag-${ Statistics.tags[tag.name].color}`;
    }
    return (
      <Tag.CheckableTag
        className={className}
        key={tag.name}
        checked={isChecked}
        onChange={(checked) => handleChange(tag.name, checked)}
      >
        {tag.name}
      </Tag.CheckableTag>
    );
  };

  if (data.allMarkdownRemark) {
    data.allMarkdownRemark.edges.forEach((val) => {
      if (!val.node || !val.node.frontmatter || !val.node.frontmatter.tags) {
        val.tags = new Set();
      } else {
        val.tags = new Set(val.node.frontmatter.tags);
      }
    });
  }

  return (
    <Layout className="outerPadding">
      <Layout className="container">
        <Header />
        <SEO
          title="Posts"
          description="I like blogging about various web technologies and other stuff related to
          javascript and other trends like graphql, prisma etc. This blog expresses my views of various technologies
          and scenarios I have come across in realtime."
          path="posts"
        />
        <SidebarWrapper>
          <div className="marginTopTitle">
            <h1 className="titleSeparate">Posts</h1>
          </div>
          <Row gutter={[8, 8]}>
            { tags.map(generateTag)}
          </Row>
          <Row gutter={[20, 20]}>
            {
            data.allMarkdownRemark && data.allMarkdownRemark.edges.map((val, key) => {
              // eslint-disable-next-line no-restricted-syntax
              for (const tag of selectedTags) {
                if (!val.tags.has(tag)) return null;
              }
              return (
              // eslint-disable-next-line react/no-array-index-key
                <Col key={key} xs={24} sm={24} md={24} lg={8}>
                  <PostCard data={val} />
                </Col>
              );
            })
          }
          </Row>
        </SidebarWrapper>
      </Layout>
    </Layout>
  );
};

Posts.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "/posts\/.*\/index\\.md$/" }
      }
    ) {
      edges {
        node {
          frontmatter {
            date
            path
            title
            tags
            excerpt
            cover {
              childImageSharp {
                fluid(maxWidth: 288) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
          fileAbsolutePath
        }
      }
    }
  }
`;

export default Posts;
