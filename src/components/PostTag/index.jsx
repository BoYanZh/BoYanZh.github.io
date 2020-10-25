import { Col, Tag } from 'antd';
import React from 'react';
// import Statistics from '../../../content/statistics.json';

const PostTag = (props) => {
  const { tag } = props;
  const color = tag.color || '';
  const name = tag.name || '';
  return (
    <Col xs>
      <Tag color={color}>
        <a href={`/tags/${name}`}>{`#${name}`}</a>
      </Tag>
    </Col>
  );
};

export default PostTag;
