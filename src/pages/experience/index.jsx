import React from 'react';
import { Layout, Col, Row, Card } from 'antd';
import Header from '../../components/PageLayout/Header';
import SEO from '../../components/Seo';
import SidebarWrapper from '../../components/PageLayout/Sidebar';
import Config from '../../../config';

const generateExperience = (data) => (
  <Col xs={24}>
    <Card>
      <Card.Meta
        title={data.title || ''}
        description={data.date || ''}
        style={{ marginBottom: '1rem' }}
      />
      { data.location }
    </Card>
  </Col>
);

const Experience = () => (
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
            {Config.experience.map(generateExperience)}
          </Row>
        </>
      </SidebarWrapper>
    </Layout>
  </Layout>
);

export default Experience;
