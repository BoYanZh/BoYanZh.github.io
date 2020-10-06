import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import { Row, Col } from 'antd';
import style from './postCard.module.less';
import PostTag from '../PostTag';
import Utils from '../../utils/pageUtils';

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
          <h3>{frontmatter ? frontmatter.title : ''}</h3>
        </div>
      </Link>
      <Row align="middle" gutter={[0, 8]}>
        <Col xs>
          <span className={style.dateHolder}>{frontmatter ? moment(frontmatter.date).format('MMM Do YYYY') : ''}</span>
        </Col>
        { frontmatter.tags.map((tag) => (<PostTag tag={tag} />))}
      </Row>
      <Link to={Utils.resolvePageUrl(frontmatter.path)}>
        <p>{frontmatter ? frontmatter.excerpt : ''}</p>
        {/* </div> */}
      </Link>
    </div>
  );
};

export default PostCard;
