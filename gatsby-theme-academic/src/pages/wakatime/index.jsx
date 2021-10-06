/* eslint-disable react/forbid-prop-types */
import { Layout, Row } from 'antd';
import React from 'react';

import Header from '../../components/PageLayout/Header';
import SidebarWrapper from '../../components/PageLayout/Sidebar';
import SEO from '../../components/Seo';
import WakaTimeImage, { WakaTimeTypes } from '../../components/WakaTimeImage';

const WakaTime = () => (
  <Layout className="outerPadding">
    <Layout className="container">
      <Header />
      <SEO
        title="WakaTime"
        description="This page consists of your wakatime stats."
        path="wakatime"
      />
      <SidebarWrapper>
        <>
          <div className="marginTopTitle">
            <h1 className="titleSeparate">WakaTime Activities</h1>
          </div>
          <Row gutter={[20, 20]}>
            {
              WakaTimeTypes.map((val) => (
                <WakaTimeImage type={val} />
              ))
            }
          </Row>
        </>
      </SidebarWrapper>
    </Layout>
  </Layout>
);

export default WakaTime;
