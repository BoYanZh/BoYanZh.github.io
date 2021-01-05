import React from 'react';
import { Timeline } from 'react-event-timeline';
import { Col, Row } from 'antd';
import Config from '../../../../config';
import TimelineItem from '../../TimelineItem';

const Awards = () => (
  <div>
    <h2 style={{ marginBottom: '0rem' }}>Awards & Scholarships</h2>
    <Row>
      <Col xs={24} sm={24} md={12} lg={15}>
        <Timeline lineStyle={{ display: 'none' }}>
          {Config.awards.map(TimelineItem)}
        </Timeline>
      </Col>
    </Row>
  </div>
);

export default Awards;
