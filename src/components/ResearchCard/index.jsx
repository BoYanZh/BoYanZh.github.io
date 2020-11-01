import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import {
  Row, Col, Card, Button, Divider,
} from 'antd';
import { navigate } from '@reach/router';
import style from './researchCard.module.less';
import PostTag from '../PostTag';
import Utils from '../../utils/pageUtils';

const ResearchCard = (props) => {
  const { data: { node }, tagsMap } = props;
  Utils.generateOmittedPostInfo(node);
  const { frontmatter, fields } = node;
  const { parsed } = fields;
  console.log(parsed);

  const url = Utils.resolvePageUrl(frontmatter.path);
  const handleClick = (e) => {
    const tagName = e.target.tagName.toLowerCase();
    if (tagName !== 'a' && tagName !== 'span' && url) {
      // window.location.href = url;
      navigate(url);
    }
  };

  const generateLink = (link) => (
    <Col xs>
      <Button href={link.url} target="_blank" size="small">{link.name}</Button>
    </Col>
  );

  return (
    <Card
      className={style.researchCard}
      bodyStyle={{ padding: '0.8rem' }}
      hoverable
      /* cover={(
        <div>
          <span className={style.dateHolder}>{frontmatter ? moment(frontmatter.date).format('MMM Do YYYY') : ''}</span>
          <div
            className={style.postCardImg}
            style={{
              backgroundImage: `url(${frontmatter && frontmatter.cover ? frontmatter.cover.childImageSharp.fluid.src : ''})`,
            }}
          />
        </div>
      )} */
      onClick={handleClick}
    >
      <Card.Meta
        title={frontmatter ? frontmatter.title : ''}
        style={{ marginBottom: '1rem' }}
        // description={frontmatter && frontmatter.venue ? frontmatter.venue : ''}
      />
      {
        frontmatter && frontmatter.authors
          ? (
            <Row align="middle" gutter={[8, 8]}>
              {frontmatter.authors.map((author, index) => (
                <Col xs>
                  <span>
                    {author + (index !== frontmatter.authors.length - 1 ? ',' : '')}
                  </span>
                </Col>
              ))}
            </Row>
          ) : null
      }
      <Row align="middle" gutter={[0, 8]}>
        {frontmatter && frontmatter.date
          ? [
            <Col xs>
              <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                {moment(frontmatter.date).format('MMM Do YYYY')}
              </span>
            </Col>,
            <Divider type="vertical" />,
          ] : null}
        {frontmatter && frontmatter.venue
          ? [
            <Col xs>
              <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                {frontmatter.venue}
              </span>
            </Col>,
            <Divider type="vertical" />,
          ] : null}
        { frontmatter.tags.map((tag) => (tagsMap[tag] ? <PostTag tag={tagsMap[tag]} /> : null))}
      </Row>
      <p style={{ marginTop: '1rem' }}>{frontmatter ? frontmatter.excerpt : ''}</p>
      <Row gutter={[8, 8]}>
        {parsed && parsed.links ? parsed.links.map(generateLink) : null }
      </Row>
    </Card>
  /*    <div className={style.researchCard}>
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
    </div> */
  );
};

export default ResearchCard;
