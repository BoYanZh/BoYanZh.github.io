import React from 'react';
import moment from 'moment';
// import { Link } from 'gatsby';
import {
  Row, Col, Card, Button, Divider,
} from 'antd';
// import { navigate } from '@reach/router';
import style from './researchCard.module.less';
import PostTag from '../PostTag';
import Utils from '../../utils/pageUtils';

const ResearchCard = (props) => {
  const { data: { node }, tagsMap } = props;
  const { fields: { parsed }, frontmatter: { cover } } = node;
  const {
    title, authors, excerpt, path, links, date, tags, venue,
  } = parsed;
  const fluid = cover ? cover.childImageSharp.fluid : null;

  const url = Utils.resolvePageUrl(path);
  const handleClick = (e) => {
    const tagName = e.target.tagName.toLowerCase();
    if (tagName !== 'a' && tagName !== 'span' && url) {
      window.location.href = url;
      // navigate(url);
    }
  };

  const generateLink = (link) => (
    <Col xs>
      <Button href={link.url} target="_blank" size="small">{link.name}</Button>
    </Col>
  );

  const generateAuthor = (author, index) => (
    <Col xs>
      <span>
        {author + (index !== authors.length - 1 ? ',' : '')}
      </span>
    </Col>
  );

  let infoLine = [];
  if (date) {
    infoLine = infoLine.concat([
      <Col xs>
        <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
          {moment(date).format('MMM Do YYYY')}
        </span>
      </Col>,
      <Divider type="vertical" className={style.divider} />,
    ]);
  }
  if (venue) {
    infoLine = infoLine.concat([
      <Col xs>
        <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
          {venue}
        </span>
      </Col>,
      <Divider type="vertical" className={style.divider} />,
    ]);
  }
  if (tags) {
    infoLine = infoLine.concat(tags.map(
      (tag) => (tagsMap[tag] ? <PostTag tag={tagsMap[tag]} /> : null),
    ));
  } else if (infoLine.length > 0) {
    // delete the divider if there are no tags
    infoLine.pop();
  }

  return (
    <Card
      className={style.researchCard}
      bodyStyle={{ padding: '0.8rem' }}
      hoverable
      onClick={handleClick}
    >
      <Row gutter={[8, 0]} align="middle">
        <Col xs={24} sm={24} md={24} lg={16}>
          <Card.Meta
            title={title}
            style={{ marginBottom: '4px' }}
          />
          <Row align="middle" gutter={[8, 4]}>
            {authors ? authors.map(generateAuthor) : null}
          </Row>
          <Row align="middle" gutter={[0, 4]}>
            {infoLine}
          </Row>
          <p style={{ marginTop: '1rem' }}>
            {excerpt}
          </p>
          <Row gutter={[8, 8]}>
            {links ? links.map(generateLink) : null}
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8}>
          <div
            className={style.postCardImg}
            style={{
              backgroundImage: `url(${fluid ? fluid.src : ''})`,
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default ResearchCard;
