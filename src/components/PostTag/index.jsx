import { Col, Tag } from 'antd';
import React from 'react';
import Statistics from '../../../content/statistics.json';

const PostTag = (props) => {
  const { tag } = props;
  const color = Statistics.tags[tag] ? Statistics.tags[tag].color : '';
  return (
    <Col xs>
      <Tag color={color}>
        <a href={`/tags/${tag}`}>{`#${tag}`}</a>
      </Tag>
    </Col>
  );
};

export default PostTag;
