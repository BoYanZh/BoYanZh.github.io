import React from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import { Col, List, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Config from '../../../../config';

const AwardItem = (data) => {
  const title = (
    <Row justify="space-between" align="middle">
      <Col>
        {data.title}
      </Col>
      <Col style={{ fontWeight: '200' }}>
        {data.date}
      </Col>
    </Row>
  );
  return (
    <List.Item style={{ paddingBottom: '0rem' }}>
      <List.Item.Meta
        avatar={<FontAwesomeIcon size="lg" fixedWidth icon={data.icon || 'award'} />}
        title={title}
      />
    </List.Item>
  );
};

const Awards = () => (
  <div>
    <h2 style={{ marginBottom: '0.8rem' }}>Awards & Scholarships</h2>
    <Row>
      <Col xs={24} sm={24} md={12} lg={15}>
        <List itemLayout="horizontal" split={false} style={{ width: '95%', margin: '0px auto', paddingBottom: '0.8rem' }}>
          {Config.awards.map(AwardItem)}
        </List>
      </Col>
    </Row>
  </div>
);

export default Awards;
