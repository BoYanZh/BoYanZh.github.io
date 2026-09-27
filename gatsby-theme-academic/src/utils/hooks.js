/* eslint-disable import/prefer-default-export */
import { graphql, useStaticQuery } from 'gatsby';
import { useState, useEffect } from 'react';

const THEME_MODE = 'theme-mode';
const getThemeMode = () => {
  if (typeof window === 'undefined') return 'light';
  // Set by the blocking init script in gatsby-ssr.js before first paint.
  if (window.__themeMode === 'dark' || window.__themeMode === 'light') return window.__themeMode;
  const savedThemeMode = window.localStorage.getItem(THEME_MODE);
  if (savedThemeMode === 'dark' || savedThemeMode === 'light') return savedThemeMode;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyThemeClass = (mode) => {
  const themeClassName = `rs-theme-${mode}`;
  const otherClassName = `rs-theme-${mode === 'dark' ? 'light' : 'dark'}`;
  window.document.documentElement.classList.remove(otherClassName);
  window.document.documentElement.classList.add(themeClassName);
  // Keep body in sync: existing styles/hooks target either ancestor.
  window.document.body.classList.remove(otherClassName);
  window.document.body.classList.add(themeClassName);
  window.__themeMode = mode;
};

export const useTheme = () => {
  // Lazy initializer reads the pre-painted value, so the first client
  // render already matches and no light->dark flip happens on hydration.
  const [themeMode, setThemeMode] = useState(getThemeMode);

  useEffect(() => {
    applyThemeClass(themeMode);
  }, [themeMode]);

  const setAndPersistThemeMode = (mode) => {
    window.localStorage.setItem(THEME_MODE, mode);
    setThemeMode(mode);
  };

  return [themeMode, setAndPersistThemeMode];
};

/**
 * custom hook to detect the window size of a browser
 * @return {Array} [height, width ].
 */
export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          pathPrefix
          siteUrl
          title
          description
          author
          authorAlternative
          introduction
          avatar
          professions
          tocMaxDepth
          excerptMaxLength
          birthday
          location
          email
          language
          postsForArchivePage
          social {
            url
            icon
          }
          disqusScript
          contactFormUrl
          pages {
            home
            posts
            contact
            resume
            tags
            project
          }
          wakatime {
            username
            activity
            language
            editor
            os
          }
          interests {
            icon
            title
          }
          education {
            date
            icon
            title
            location
          }
          experience {
            title
            position
            data {
              date
              title
              location
              description
            }
          }
          awards {
            date
            title
          }
          tags {
            id
            name
            description
            color
          }
        }
      }
    }
  `);
  return data.site.siteMetadata;
};
