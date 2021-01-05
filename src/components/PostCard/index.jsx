import React from 'react';
// import moment from 'moment';
// import { Link } from 'gatsby';
import {
  Row, Card,
} from 'antd';
// import { navigate } from '@reach/router';
import Img from 'gatsby-image';

import classnames from 'classnames';
import style from './postCard.module.less';
import PostTag from '../PostTag';
import Utils from '../../utils/pageUtils';

const PostCard = (props) => {
  const { data: { node }, tagsMap } = props;
  const { fields: { slug }, frontmatter: { cover } } = node;
  const {
    title, excerpt, path, date, tags,
  } = slug;
  const fluid = cover ? cover.childImageSharp.fluid : null;

  const url = Utils.resolvePageUrl(path);
  const handleClick = (e) => {
    if (e.target.tagName.toLowerCase() !== 'a' && url) {
      window.location.href = Utils.generateFullUrl(url);
      // navigate(url);
    }
  };

  return (
    <Card
      className={classnames(style.postCard, 'cursor-default')}
      bodyStyle={{ padding: '0.8rem' }}
      hoverable
      cover={(
        <div>
          { fluid ? <Img fluid={fluid} /> : <div className={style.postCardImg} />}
          <span className={style.dateHolder}>
            {date ? Utils.formatDate(date) : ''}
          </span>
        </div>
      )}
      onClick={handleClick}
    >
      <Card.Meta
        title={<span className={style.title}>{title}</span>}
        style={{ marginBottom: '1rem' }}
      />
      <Row align="middle" gutter={[0, 8]}>
        { tags ? tags.map((tag) => (tagsMap[tag] ? <PostTag tag={tagsMap[tag]} /> : null)) : null}
      </Row>
      <p style={{ marginTop: '1rem' }} dangerouslySetInnerHTML={{ __html: Utils.parseMarkDown(excerpt, true) }} />
    </Card>
  );
};

export default PostCard;
