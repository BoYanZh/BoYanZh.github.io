import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Tag, Divider,
} from "antd"
import _ from 'lodash';

import style from './panel.module.less';

import PostCard from '../PostCard';
import ResearchCard from '../ResearchCard';
// import PostTag from '../PostTag';
import Utils from '../../utils/pageUtils';
import Statistics from '../../../content/statistics.json';

const Panel = (props) => {
  const { type, data } = props;
  const isResearch = type === 'research';

  const tags = Utils.getTags();
  const [selectedTags, setSelectedTags] = useState(new Set());

  const handleClick = (tagName) => {
    const nextSelectedTags = _.clone(selectedTags);
    if (nextSelectedTags.has(tagName)) {
      nextSelectedTags.delete(tagName);
    } else {
      nextSelectedTags.add(tagName);
    }
    console.log('You are interested in: ', nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  const generateTag = (tag) => {
    const isChecked = selectedTags.has(tag.name);
    let color = '';
    if (isChecked && Statistics.tags[tag.name]) {
      color = Statistics.tags[tag.name].color;
    }
    return (
      <Col xs>
        <Tag color={color}>
          <a onClick={() => handleClick(tag.name)}>
            {tag.name}
          </a>
        </Tag>
      </Col>
    );
  };

  if (data.allMarkdownRemark) {
    data.allMarkdownRemark.edges.forEach((val) => {
      if (!val.node || !val.node.frontmatter || !val.node.frontmatter.tags) {
        // eslint-disable-next-line no-param-reassign
        val.tags = new Set();
      } else {
        // eslint-disable-next-line no-param-reassign
        val.tags = new Set(val.node.frontmatter.tags);
      }
    });
  }

  return (
    <>
      <section className={style.codeBox}>
        <section className={style.codeBoxTitle}>
          Filters
        </section>
        <section className={style.codeBoxDescription}>
          <Row gutter={[0, 8]} align="middle">
            <Col xs>
              <h5 style={{ marginBottom: '0', marginRight: '10px' }}>
                Tags:
              </h5>
            </Col>
            { tags.map(generateTag)}
          </Row>
        </section>
      </section>
      <Row gutter={[20, 20]}>
        {
          data.allMarkdownRemark && data.allMarkdownRemark.edges.map((val, key) => {
            // eslint-disable-next-line no-restricted-syntax
            for (const tag of selectedTags) {
              if (!val.tags.has(tag)) return null;
            }
            if (isResearch) {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Col key={key} xs={24} sm={24} md={24} lg={24}>
                  <ResearchCard data={val} />
                </Col>
              );
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
    </>
  );
};

Panel.propTypes = {
  type: PropTypes.oneOf(['posts', 'research']).isRequired,
};

export default Panel;
