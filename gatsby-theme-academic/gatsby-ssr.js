import React from 'react';
import {
  wrapPageElement as _wrapPageElement,
} from './src/utils/providers';

export const wrapPageElement = _wrapPageElement;

// Blocking theme init script: runs before first paint so dark-mode users
// never see a white flash. Mirrors getThemeMode() in src/utils/hooks.js and
// stores the result on window.__themeMode for the React hook to pick up.
const themeInitScript = `
(function(){try{var s=localStorage.getItem('theme-mode');var t=(s==='dark'||s==='light')?s:((window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');document.documentElement.classList.add('rs-theme-'+t);window.__themeMode=t;}catch(e){}})();
`;

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement('script', {
      key: 'theme-mode-init',
      dangerouslySetInnerHTML: { __html: themeInitScript },
    }),
  ]);
};
