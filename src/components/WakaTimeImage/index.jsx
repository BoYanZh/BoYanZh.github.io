import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from 'antd';

import Config from '../../../config';

const WakaTimeTypes = ['activity', 'language', 'editor', 'os'];

const titles = {
  activity: 'Code Activity',
  language: 'Languages',
  editor: 'Editors',
  os: 'Operating Systems',
};

const generateURL = (wakatimeType) => {
  if (!Config.wakatime) return '';
  if (!Config.wakatime.username) return '';
  if (!Config.wakatime[wakatimeType]) return '';
  return `https://wakatime.com/share/@${Config.wakatime.username}/${Config.wakatime[wakatimeType]}.svg`;
};

const WakaTimeImage = (props) => {
  const { type } = props;
  const url = generateURL(type);
  if (!url) return null;

  return (
    <Col xs={24} sm={24} md={24} lg={12}>
      <Card title={titles[type]}>
        <object type="image/svg+xml" data={url}>
          <img src={url} alt={type} />
        </object>
      </Card>
    </Col>
  );
};

WakaTimeImage.propTypes = {
  type: PropTypes.oneOf(WakaTimeTypes).isRequired,
};

export default WakaTimeImage;
export { WakaTimeTypes };
