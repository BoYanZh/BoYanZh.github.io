import React from 'react';
import { Col, Row } from 'antd';
import _ from 'lodash';
import ResearchCard from '../../ResearchCard';

const SelectedResearch = ({ data }) => {
  const tags = data.allTag ? data.allTag.edges : [];
  const tagsMap = _.mapValues(_.keyBy(tags, (tag) => tag.node.name), 'node');

  return (
    <div style={{ marginTop: '0.8rem' }} >
      <h2 style={{ marginBottom: '1rem' }}>Selected Research</h2>
      <Row gutter={[20, 20]}>
        {
        data.allMdx && data.allMdx.edges.map((val, key) => (
          // eslint-disable-next-line react/no-array-index-key
          <Col key={key} xs={24} sm={24} md={24} lg={24}>
            <ResearchCard data={val} tagsMap={tagsMap} />
          </Col>
        ))
      }
      </Row>
    </div>
  );
};

export default SelectedResearch;
