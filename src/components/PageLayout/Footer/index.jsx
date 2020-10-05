import React from 'react';
import { Divider, Typography } from 'antd';

export default () => (
  <>
    <Divider style={{ color: 'rgba(0, 0, 0, 0.45)', marginTop: '3rem', marginBottom: '0' }}>
      <Typography.Text type="secondary">
        {'Made with '}
        <a href="https://www.gatsbyjs.com/">Gatsby</a>
        {', '}
        <a href="https://ant.design/">Ant Design</a>
        {', '}
        <a href="https://www.jetbrains.com/lp/mono/">Jetbrains Mono Font</a>
        {' and '}
        <a href="https://github.com/">GitHub</a>
        {' style markdown'}
      </Typography.Text>
    </Divider>
  </>
);
