import {
  Row, Col, Tag,
} from 'antd';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import CodeBox from '../CodeBox';
import PostCard from '../PostCard';
import ProjectCard from '../ProjectCard';
// import PostTag from '../PostTag';
// import Utils from '../../utils/pageUtils';
// import Statistics from '../../../content/statistics.json';

const Panel = (props) => {
  const { type, data } = props;
  const isProject = type === 'project';

  // console.log(data.allTag);
  const tags = data.allTag ? data.allTag.edges : [];
  const tagsMap = _.mapValues(_.keyBy(tags, (tag) => tag.node.name), 'node');

  // const tags = Utils.getTags(type);
  const [selectedTags, setSelectedTags] = useState(new Set());

  const handleClick = (tagName) => {
    const nextSelectedTags = _.clone(selectedTags);
    if (nextSelectedTags.has(tagName)) {
      nextSelectedTags.delete(tagName);
    } else {
      nextSelectedTags.add(tagName);
    }
    // console.log('You are interested in: ', nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  const generateTag = (tag) => {
    const isChecked = selectedTags.has(tag.node.name);
    const color = isChecked ? tag.node.color : '';
    const handleTagClick = () => handleClick(tag.node.name);
    return (
      <Col xs>
        <Tag color={color}>
          <a onClick={handleTagClick} onKeyPress={handleTagClick} role="button" tabIndex={0}>
            {tag.node.name}
          </a>
        </Tag>
      </Col>
    );
  };

  if (data.allMdx) {
    data.allMdx.edges.forEach((val) => {
      if (!val.node || !val.node.fields || !val.node.fields.slug
        || !val.node.fields.slug.tags) {
        // eslint-disable-next-line no-param-reassign
        val.tags = new Set();
      } else {
        // eslint-disable-next-line no-param-reassign
        val.tags = new Set(val.node.fields.slug.tags);
      }
    });
  }

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <CodeBox title="Filters">
            <Row gutter={[0, 8]} align="middle">
              <Col xs>
                <h5 style={{ marginBottom: '0', marginRight: '10px' }}>
                  Tags:
                </h5>
              </Col>
              { tags.map(generateTag)}
            </Row>
          </CodeBox>
        </Col>
        {
          data.allMdx && data.allMdx.edges.map((val, key) => {
            // eslint-disable-next-line no-restricted-syntax
            for (const tag of selectedTags) {
              if (!val.tags.has(tag)) return null;
            }
            if (isProject) {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Col key={key} xs={24} sm={24} md={24} lg={8}>
                  <ProjectCard data={val} tagsMap={tagsMap} />
                </Col>
              );
            }
            return (
            // eslint-disable-next-line react/no-array-index-key
              <Col key={key} xs={24} sm={24} md={24} lg={8}>
                <PostCard data={val} tagsMap={tagsMap} />
              </Col>
            );
          })
        }
      </Row>
    </>
  );
};

Panel.propTypes = {
  type: PropTypes.oneOf(['posts', 'project']).isRequired,
};

export default Panel;
