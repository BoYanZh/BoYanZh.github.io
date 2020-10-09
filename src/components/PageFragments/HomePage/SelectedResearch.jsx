import React from 'react';
import { graphql } from 'gatsby';
import { Col, Row } from 'antd';
import PublicationCard from '../../PublicationCard';

const SelectedResearch = ({ data }) => {
  console.log(data);
  return (
    <div>
      <h2 style={{ marginBottom: '0rem' }}>Selected Research</h2>
      <Row gutter={[20, 20]}>
        {
        data.allMarkdownRemark && data.allMarkdownRemark.edges.map((val, key) => (
          // eslint-disable-next-line react/no-array-index-key
          <Col key={key} xs={24} sm={24} md={24} lg={24}>
            <PublicationCard data={val} />
          </Col>
        ))
      }
      </Row>
    </div>
  );
};


export default SelectedResearch;
