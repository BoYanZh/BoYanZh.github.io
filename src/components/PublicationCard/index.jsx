import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import { Row, Col } from 'antd';
import style from './publicationCard.module.less';
import PostTag from '../PostTag';
import Utils from '../../utils/pageUtils';

const PublicationCard = (props) => {
  const { data: { node: { frontmatter } } } = props;

  return (
    <div className={style.publicationCard}>

      <Row gutter={[10, 10]} align="middle">
        <Col xs={24} sm={24} md={16} lg={16}>
          <div>
            <Link to={Utils.resolvePageUrl(frontmatter.path)}>
              <h3>{frontmatter ? frontmatter.title : ''}</h3>
            </Link>
            <Row align="middle" gutter={[0, 8]}>
              <Col xs>
                <span className={style.dateHolder}>{frontmatter ? moment(frontmatter.date).format('MMM Do YYYY') : ''}</span>
              </Col>
              { frontmatter.tags.map((tag) => (<PostTag tag={tag} />))}
            </Row>
            <Link to={Utils.resolvePageUrl(frontmatter.path)}>
              <p>{frontmatter ? frontmatter.excerpt : ''}</p>
            </Link>
          </div>
        </Col>
        <Col xs={0} sm={0} md={8} lg={8}>
          <Link to={Utils.resolvePageUrl(frontmatter.path)}>
            <div
              className={style.postCardImg}
              style={{
                backgroundImage: `url(${frontmatter && frontmatter.cover ? frontmatter.cover.childImageSharp.fluid.src : ''})`,
              }}
            />
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default PublicationCard;
