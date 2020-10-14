import React from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import { Row, Col, List } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Config from '../../../../config';

import './index.css';

const generateTimelineEvent = (data) => (
  <TimelineEvent
    title={data.title}
    titleStyle={{ fontSize: '12pt', fontWeight: 'bold' }}
    subtitle={data.location}
    subtitleStyle={{ fontSize: '13pt', fontWeight: '400' }}
    createdAt={data.date}
    style={{ fontSize: '12pt', fontWeight: '300' }}
    icon={<FontAwesomeIcon size="md" fixedWidth icon={data.icon || 'school'} />}
  />
);

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
            <Timeline lineStyle={{ top: '20px' }}>
              {previousTimeLineData.map(generateTimelineEvent)}
            </Timeline>
          ) : null}
        {Config.education.length > 0
          ? (
            <Timeline lineStyle={{ display: 'none' }} style={{ top: '-30px' }}>
              {lastTimeLineData.map(generateTimelineEvent)}
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
