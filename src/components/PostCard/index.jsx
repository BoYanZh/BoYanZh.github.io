import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import {
  Row, Col, Card, Divider,
} from 'antd';
import { navigate } from '@reach/router';

import style from './postCard.module.less';
import PostTag from '../PostTag';
import Utils from '../../utils/pageUtils';

const PostCard = (props) => {
  const { data: { node } } = props;
  Utils.generateOmittedPostInfo(node);
  const { frontmatter } = node;

  const url = Utils.resolvePageUrl(frontmatter.path);
  const handleClick = (e) => {
    if (e.target.tagName.toLowerCase() !== 'a' && url) {
      // window.location.href = url;
      navigate(url);
    }
  };

  return (
    <Card
      className={style.postCard}
      bodyStyle={{ padding: '0.8rem' }}
      hoverable
      cover={(
        <div>
          <span className={style.dateHolder}>{frontmatter ? moment(frontmatter.date).format('MMM Do YYYY') : ''}</span>
          <div
            className={style.postCardImg}
            style={{
              backgroundImage: `url(${frontmatter && frontmatter.cover ? frontmatter.cover.childImageSharp.fluid.src : ''})`,
            }}
          />
        </div>
      )}
      onClick={handleClick}
    >
      <Card.Meta
        title={frontmatter ? frontmatter.title : ''}
        style={{ marginBottom: '1rem' }}
      />
      <Row align="middle" gutter={[0, 8]}>
        { frontmatter.tags.map((tag) => (<PostTag tag={tag} />))}
      </Row>
      <p style={{ marginTop: '1rem' }}>{frontmatter ? frontmatter.excerpt : ''}</p>
    </Card>
  );
};

export default PostCard;
