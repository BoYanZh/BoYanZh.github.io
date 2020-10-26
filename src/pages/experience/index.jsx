import React from 'react';
import {
  Layout, Col, Row, Card, List,
} from 'antd';
import _ from 'lodash';
import Header from '../../components/PageLayout/Header';
import SEO from '../../components/Seo';
import SidebarWrapper from '../../components/PageLayout/Sidebar';
import Config from '../../../config';

const generateListItem = (data) => (
  <List.Item style={{ display: 'block' }}>
    <List.Item.Meta
      // avatar={<FontAwesomeIcon size="lg" fixedWidth icon={data.icon} />}
      title={data.title}
      description={`${data.date}, ${data.location}`}
      style={{ marginLeft: '12px' }}
    />
    <div style={{ marginLeft: '12px', marginTop: '4px' }}>
      {data.description}
    </div>
  </List.Item>
);

const generateExperience = (data) => (
  <Card style={{ marginBottom: '20px' }}>
    <Card.Meta
      title={data.title || ''}
        // description={data.date || ''}
      style={{ marginBottom: '1rem' }}
    />
    <List itemLayout="horizontal">
      {data.data.map(generateListItem)}
    </List>
  </Card>
);

const Experience = () => {
  const leftColumn = _.filter(Config.experience, (value, index) => index % 2 === 0);
  const rightColumn = _.filter(Config.experience, (value, index) => index % 2 === 1);
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
          </>
        </SidebarWrapper>
      </Layout>
    </Layout>
  );
};

export default Experience;
