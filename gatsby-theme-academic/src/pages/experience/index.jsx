import {
  Layout, Col, Row, Card, List,
} from 'antd';
import _ from 'lodash';
import React from 'react';

import Footer from '../../components/PageLayout/Footer';
import Header from '../../components/PageLayout/Header';
import SidebarWrapper from '../../components/PageLayout/Sidebar';
import SEO from '../../components/Seo';
import { useSiteMetadata } from '../../utils/hooks';
import Utils from '../../utils/pageUtils';

const generateListItem = (data) => {
  const title = Utils.parseMarkDown(data.title, true);
  const description = Utils.parseMarkDown(data.description, true);
  return (
    <List.Item style={{ display: 'block' }}>
      <List.Item.Meta
      // avatar={<Icon size="lg" fixedWidth icon={data.icon} />}
        title={<div dangerouslySetInnerHTML={{ __html: title }} />}
        description={`${data.date}, ${data.location}`}
        style={{ marginLeft: '12px' }}
      />
      <div
        style={{ marginLeft: '12px', marginTop: '4px' }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </List.Item>
  );
};

const generateExperience = (data) => (
  <Card className="cursor-default" style={{ marginBottom: '20px' }} hoverable>
    <Card.Meta
      title={<span style={{ fontSize: '20px' }}>{data.title || ''}</span>}
        // description={data.date || ''}
      style={{ marginBottom: '1rem' }}
    />
    <List itemLayout="horizontal">
      {data.data.map(generateListItem)}
    </List>
  </Card>
);

const Experience = () => {
  const siteMetadata = useSiteMetadata();
  const leftColumn = _.filter(siteMetadata.experience, (value) => value.position === 'left');
  const rightColumn = _.filter(siteMetadata.experience, (value) => value.position === 'right');
  return (
    <Layout className="outerPadding">
      <Layout className="container">
        <Header />
        <SEO
          title="Experience"
          description="This page consists of various Tags on various technologies that I'll be using
          to write blogs. You can check the blogs related to the tags by clicking on any of the tags below."
          path="experience"
        />
        <SidebarWrapper>
          <>
            <div className="marginTopTitle">
              <h1 className="titleSeparate">Experience</h1>
            </div>
            <Row gutter={[20, 20]}>
              <Col xs={24} sm={24} md={12}>
                {leftColumn.map(generateExperience)}
              </Col>
              <Col xs={24} sm={24} md={12}>
                {rightColumn.map(generateExperience)}
              </Col>
            </Row>
            <Footer />
          </>
        </SidebarWrapper>
      </Layout>
    </Layout>
  );
};

export default Experience;
