import React from 'react';
import { Timeline } from 'react-event-timeline';
import { Row, Col, List } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Config from '../../../../config';
import TimelineItem from '../../TimelineItem';

import './index.css';

const generateInterest = (data) => (
  <List.Item>
    <List.Item.Meta
      avatar={<FontAwesomeIcon size="lg" fixedWidth icon={data.icon} />}
      title={data.title}
    />
  </List.Item>
);

const previousTimeLineData = Config.education.slice(0, Config.education.length - 1);
const lastTimeLineData = Config.education.slice(Config.education.length - 1);

const Experience = () => (
  <div style={{ marginTop: '0.8rem' }}>
    <Row>
      <Col xs={24} sm={24} md={12} lg={15}>
        <h2 style={{ marginBottom: '0rem' }}>Education</h2>
        {Config.education.length > 1
          ? (
            <Timeline lineStyle={{ top: '20px' }} lineColor="#44566C" style={{ width: '100%' }}>
              {previousTimeLineData.map(TimelineItem)}
            </Timeline>
          ) : null}
        {Config.education.length > 0
          ? (
            <Timeline lineStyle={{ display: 'none' }} style={{ top: '-30px', width: '100%' }}>
              {lastTimeLineData.map(TimelineItem)}
            </Timeline>
          ) : null}
      </Col>
      <Col xs={24} sm={24} md={12} lg={9}>
        <h2 style={{ marginBottom: '0.8rem' }} className="interests">Interests</h2>
        <List itemLayout="horizontal" split={false}>
          {Config.interests.map(generateInterest)}
        </List>
      </Col>
    </Row>

  </div>
);

export default Experience;
