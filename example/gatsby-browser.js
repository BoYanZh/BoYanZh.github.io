const config = require('./config');

const measurementId = config.ga4MeasurementId;

exports.onRouteUpdate = ({ location }) => {
  if (
    !measurementId ||
    !measurementId.startsWith('G-') ||
    typeof window === 'undefined' ||
    typeof window.gtag !== 'function'
  ) {
    return;
  }

  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${location.pathname}${location.search || ''}${location.hash || ''}`,
  });
};
