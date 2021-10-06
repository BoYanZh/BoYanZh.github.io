import { Row, Card } from 'antd';
import classnames from 'classnames';
import Img from 'gatsby-image';
import React from 'react';

import { useSiteMetadata } from '../../utils/hooks';
import Utils from '../../utils/pageUtils';
import PostTag from '../PostTag';

import * as style from './postCard.module.less';

const PostCard = (props) => {
  const {
    data: { node },
    tagsMap,
  } = props;
  const {
    frontmatter: {
      title,
      excerpt,
      path,
      date,
      tags,
      cover,
    },
  } = node;
  const fluid = cover ? cover.childImageSharp.fluid : null;
  const siteMetadata = useSiteMetadata();
  const url = Utils.resolvePageUrl(path);
  // const handleClick = (e) => {
  //   if (e.target.tagName.toLowerCase() !== 'a' && url) {
  //     window.location.href = Utils.generateFullUrl(siteMetadata, url);
  //     // navigate(url);
  //   }
  // };

  const excerptHTML = Utils.parseMarkDown(Utils.trimExcerpt(excerpt), true);

  return (
    <Card
      className={classnames(style.postCard, 'cursor-default')}
      bodyStyle={{ padding: '0.8rem' }}
      hoverable
      cover={(
        <div>
          <a href={Utils.generateFullUrl(siteMetadata, url)}>
            {fluid ? <Img fluid={fluid} /> : <div className={style.postCardImg} />}
          </a>
          <span className={style.dateHolder}>
            {date ? Utils.formatDate(date) : ''}
          </span>
        </div>
      )}
      // onClick={handleClick}
    >
      <Card.Meta
        title={(
          <span className={style.title}>
            <a href={Utils.generateFullUrl(siteMetadata, url)}>{title}</a>
          </span>
        )}
        style={{ marginBottom: '1rem' }}
      />
      <Row align="middle" gutter={[0, 8]}>
        {tags ?
          tags.map((tag) => (tagsMap[tag] ? <PostTag key={tag} tag={tagsMap[tag]} /> : null)) :
          null}
      </Row>
      <a href={Utils.generateFullUrl(siteMetadata, url)}>
        <p style={{ marginTop: '1rem' }} dangerouslySetInnerHTML={{ __html: excerptHTML }} />
      </a>
    </Card>
  );
};

export default PostCard;
