import React from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import { Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Config from '../../../../config';

const AwardItem = (data) => {
  const title = (
    <Row justify="space-between" align="middle">
      <Col style={{ fontSize: '12pt', fontWeight: '400' }}>
        {data.title}
      </Col>
      <Col style={{ fontSize: '12pt' }}>
        {data.date}
      </Col>
    </Row>
  );
  return (
    <TimelineEvent
      title={title}
      style={{ paddingBottom: '5px' }}
      icon={<FontAwesomeIcon size="md" fixedWidth icon={data.icon || 'school'} />}
      iconStyle={{ cursor: 'default' }}
    />
  );
};

const Awards = () => (
  <div>
    <h2 style={{ marginBottom: '0rem' }}>Awards & Scholarships</h2>
    <Row>
      <Col xs={24} sm={24} md={12} lg={15}>
        <Timeline lineStyle={{ display: 'none' }}>
          {Config.awards.map(AwardItem)}
        </Timeline>
      </Col>
    </Row>
  </div>
);

export default Awards;
