const config = require('./config');

const measurementId = config.ga4MeasurementId;
let isInitialRoute = true;

exports.onRouteUpdate = ({ location }) => {
  // The standard GA4 config call records the initial page view. Only emit
  // manual page_view events for subsequent Gatsby client-side navigations.
  if (isInitialRoute) {
    isInitialRoute = false;
    return;
  }

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
