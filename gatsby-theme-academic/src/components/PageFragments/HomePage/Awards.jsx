import { Col, Row } from 'antd';
import React from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline';

import { useSiteMetadata } from '../../../utils/hooks';
import Icon from '../../Icon';

import * as styles from './homePage.module.less';

const AwardItem = (data) => {
  const title = (
    <Row justify="space-between" align="middle">
      {/* <Col>
        {data.title}
      </Col>
      <Col style={{ fontWeight: '200' }}>
        {data.date}
      </Col> */}
      <Col
        xs={24}
        sm={24}
        md={12}
        lg={15}
        style={{
          fontSize: '12pt',
          fontWeight: '500',
        }}
      >
        {data.title}
      </Col>
      <Col xs={24} sm={24} md={12} lg={9} style={{ fontSize: '12pt' }}>
        {data.date}
      </Col>
    </Row>
  );
  return (
    /*    <List.Item style={{ paddingBottom: '0rem' }}>
        <List.Item.Meta
          avatar={<Icon size="lg" fixedWidth icon={data.icon || 'award'} />}
          title={title}
        />
      </List.Item> */
    <TimelineEvent
      title={title}
      style={{
        paddingBottom: '0.8rem',
        paddingTop: '0.8px',
      }}
      icon={<Icon size={data.iconSize || 'lg'} fixedWidth icon={data.icon || 'award'} />}
      iconStyle={{ cursor: 'default' }}
      iconColor="#44566C"
      // bubbleStyle={{ background: 'none', border: '0' }}
    />
  );
};

const Awards = () => {
  const siteMetadata = useSiteMetadata();
  return (
    <div className={styles.homepageSection}>
      <h2 style={{ marginBottom: '0rem' }}>Awards & Scholarships</h2>
      <Row>
        <Col xs={24} style={{ marginBottom: '-0.5rem' }}>
          <Timeline lineStyle={{ display: 'none' }} style={{ width: '100%' }}>
            {siteMetadata.awards.map(AwardItem)}
          </Timeline>
        </Col>
      </Row>
    </div>
  );
};

export default Awards;
