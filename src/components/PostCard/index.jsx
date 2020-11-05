import React from 'react';
import moment from 'moment';
// import { Link } from 'gatsby';
import {
  Row, Card,
} from 'antd';
// import { navigate } from '@reach/router';

import style from './postCard.module.less';
import PostTag from '../PostTag';
import Utils from '../../utils/pageUtils';

const PostCard = (props) => {
  const { data: { node }, tagsMap } = props;
  const { fields: { parsed }, frontmatter: { cover } } = node;
  const {
    title, excerpt, path, date, tags,
  } = parsed;
  const fluid = cover ? cover.childImageSharp.fluid : null;

  const url = Utils.resolvePageUrl(path);
  const handleClick = (e) => {
    if (e.target.tagName.toLowerCase() !== 'a' && url) {
      window.location.href = url;
      // navigate(url);
    }
  };

  return (
    <Card
      className={style.postCard}
      bodyStyle={{ padding: '0.8rem' }}
      hoverable
      cover={(
        <div>
          <span className={style.dateHolder}>
            {date ? moment(date).format('MMM Do YYYY') : ''}
          </span>
          <div
            className={style.postCardImg}
            style={{
              backgroundImage: `url(${fluid ? fluid.src : ''})`,
            }}
          />
        </div>
      )}
      onClick={handleClick}
    >
      <Card.Meta
        title={title}
        style={{ marginBottom: '1rem' }}
      />
      <Row align="middle" gutter={[0, 8]}>
        { tags ? tags.map((tag) => (tagsMap[tag] ? <PostTag tag={tagsMap[tag]} /> : null)) : null}
      </Row>
      <p style={{ marginTop: '1rem' }}>
        {excerpt}
      </p>
    </Card>
  );
};

export default PostCard;
