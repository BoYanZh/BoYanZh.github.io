const React = require('react');
const config = require('./config');

const measurementId = config.ga4MeasurementId;

exports.onRenderBody = ({ setHeadComponents }) => {
  if (!measurementId || !measurementId.startsWith('G-')) return;

  setHeadComponents([
    React.createElement('script', {
      key: 'ga4-loader',
      async: true,
      src: `https://www.googletagmanager.com/gtag/js?id=${measurementId}`,
    }),
    React.createElement('script', {
      key: 'ga4-config',
      dangerouslySetInnerHTML: {
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
        `,
      },
    }),
  ]);
};
