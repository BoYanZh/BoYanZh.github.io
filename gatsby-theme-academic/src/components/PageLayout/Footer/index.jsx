import { Divider, Typography } from 'antd';
import { useStaticQuery, graphql } from 'gatsby';
import moment from 'moment';
import React from 'react';

export default () => {
  const data = useStaticQuery(graphql`
  query {
    currentBuildDate {
      currentDate
    }
  }
`);
  const { currentBuildDate: { currentDate } } = data;
  const buildTime = moment(currentDate).format('MMM Do, YYYY');
  return (
    <>
      <Divider style={{ color: 'rgba(0, 0, 0, 0.45)', marginTop: '3rem', marginBottom: '-3rem' }}>
        <Typography.Text type="secondary">
          {/* {'Made with '}
        <a href="https://www.gatsbyjs.com/">Gatsby</a>
        {', '}
        <a href="https://ant.design/">Ant Design</a>
        {', '}
        <a href="https://www.jetbrains.com/lp/mono/">Jetbrains Mono Font</a>
        {' and '}
        <a href="https://github.com/">GitHub</a>
        {' style markdown'} */}
          {`Last Updated on ${buildTime}. `}
          {'Powered by '}
          <a href="https://github.com/BoYanZh/greatest-gatsby-academic-template">
            greatest-gatsby-academic-template
          </a>
          .
        </Typography.Text>
      </Divider>
    </>
  );
};
