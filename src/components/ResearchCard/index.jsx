import React from 'react';
// import moment from 'moment';
// import { Link } from 'gatsby';
import {
  Row, Col, Card, Button, Divider,
} from 'antd';
// import { navigate } from '@reach/router';
import Img from 'gatsby-image';
import isRelativeUrl from 'is-relative-url';
import classnames from 'classnames';
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
  // console.log(fluid);

  const url = Utils.resolvePageUrl(path);
  const handleClick = (e) => {
    const tagName = e.target.tagName.toLowerCase();
    if (tagName !== 'a' && tagName !== 'span' && url) {
      window.location.href = Utils.generateFullUrl(url);
      // navigate(url);
    }
  };

  const generateLink = (link) => {
    let href = '#';
    if (link.url) {
      if (isRelativeUrl(link.url)) {
        href = Utils.generateFullUrl(link.url);
      } else {
        href = link.url;
      }
    }
    return (
      <Col xs>
        <Button href={href} target="_blank" size="small">{link.name}</Button>
      </Col>
    );
  };

  const generateAuthor = (author, index) => {
    let markdown = Utils.parseMarkDown(author);
    if (index !== authors.length - 1) {
      markdown += ',';
    }
    return (
      <Col xs>
        <span dangerouslySetInnerHTML={{ __html: markdown }} />
      </Col>
    );
  };

  let infoLine = [];
  if (date) {
    infoLine = infoLine.concat([
      <Col xs>
        <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
          {Utils.formatDate(date)}
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
      className={classnames(style.researchCard, 'cursor-default')}
      bodyStyle={{ padding: '0.8rem' }}
      hoverable
      onClick={handleClick}
    >
      <Row gutter={[8, 0]} align="middle">
        <Col xs={24} sm={24} md={24} lg={12} xl={16}>
          <Card.Meta
            title={<span className={style.title}>{title}</span>}
            style={{ marginBottom: '4px' }}
          />
          <Row align="middle" gutter={[8, 4]}>
            {authors ? authors.map(generateAuthor) : null}
          </Row>
          <Row align="middle" gutter={[0, 4]}>
            {infoLine}
          </Row>
          <p style={{ marginTop: '1rem' }} dangerouslySetInnerHTML={{ __html: Utils.parseMarkDown(excerpt) }} />
          <Row gutter={[8, 8]}>
            {links ? links.map(generateLink) : null}
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={8}>
          <Img fluid={fluid} />
        </Col>
      </Row>
    </Card>
  );
};

export default ResearchCard;
