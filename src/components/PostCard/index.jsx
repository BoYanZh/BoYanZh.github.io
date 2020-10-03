import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import { Tag } from 'antd';
import style from './postCard.module.less';
import Utils from '../../utils/pageUtils';
import Statistics from '../../../content/statistics.json';

const generateTag = (tag) => {
  const color = Statistics.tags[tag] ? Statistics.tags[tag].color : '';
  return (
    <Tag color={color}>
      <a href={`/tags/${tag}`}>{`#${tag}`}</a>
    </Tag>
  );
};

const PostCard = (props) => {
  const { data: { node } } = props;
  Utils.generateOmittedPostInfo(node);
  const { frontmatter } = node;

  return (
    <div className={style.postCard}>
      <Link to={Utils.resolvePageUrl(frontmatter.path)}>
        <div
          className={style.postCardImg}
          style={{
            backgroundImage: `url(${frontmatter && frontmatter.cover ? frontmatter.cover.childImageSharp.fluid.src : ''})`,
          }}
        />
        <div className={style.mrTp20}>
          <p>
            <span className={style.dateHolder}>{frontmatter ? moment(frontmatter.date).format('MMM Do YYYY') : ''}</span>
          </p>
          <h3>{frontmatter ? frontmatter.title : ''}</h3>
          <p>{frontmatter ? frontmatter.excerpt : ''}</p>
        </div>
      </Link>
      <p style={{ color: '#ce6d96', wordSpacing: '10px' }}>
        {
          frontmatter.tags.map(generateTag)
        }
      </p>
    </div>
  );
};

export default PostCard;
