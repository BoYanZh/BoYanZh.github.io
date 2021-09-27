import { Col, Tag } from 'antd';
import React from 'react';

import { useSiteMetadata } from '../../utils/hooks';
import Utils from '../../utils/pageUtils';

const PostTag = (props) => {
  const siteMetadata = useSiteMetadata();
  const { tag } = props;
  const color = tag.color || '';
  const name = tag.name || '';
  const href = name ? Utils.generateFullUrl(siteMetadata, `/tags/${name}`) : '#';
  return (
    <Col xs>
      <Tag color={color}>
        <a href={href}>{`#${name}`}</a>
      </Tag>
    </Col>
  );
};

export default PostTag;
