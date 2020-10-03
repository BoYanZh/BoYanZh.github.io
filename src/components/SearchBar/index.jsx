/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useCallback, useEffect } from 'react';
import classnames from 'classnames';
import { Input } from 'antd';

// import Config from '../../../config';
import DocSearch from './lib/DocSearch';
import './algolia.css';
import './styles.css';

// import { useHistory } from "@docusaurus/router";
// import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

/* eslint-disable no-underscore-dangle */

const Search = (props) => {
  const initialized = useRef(false);
  const searchBarRef = useRef(null);
  const baseUrl = '/';
  const initAlgolia = (searchDocs, searchIndex) => {
    // eslint-disable-next-line no-new
    new DocSearch({
      searchDocs,
      searchIndex,
      inputSelector: '#search_input_react',
      // Override algolia's default selection event, allowing us to do client-side
      // navigation and avoiding a full page refresh.
      handleSelected: (_input, _event, suggestion) => {
        const url = baseUrl + suggestion.url;
        console.log(url);
        // Use an anchor tag to parse the absolute url into a relative url
        // Alternatively, we can use new URL(suggestion.url) but its not supported in IE
        // const a = document.createElement('a');
        // a.href = url;
        // Algolia use closest parent element id #__docusaurus
        // when a h1 page title does not have an id
        // So, we can safely remove it. See https://github.com/facebook/docusaurus/issues/1828 for more details.
        // history.push(url);
      },
    });
  };

  /*  const getSearchDoc = () => (process.env.NODE_ENV === 'production'
    ? fetch(`${baseUrl}search-doc.json`).then((content) => content.json())
    : Promise.resolve([]));

  const getLunrIndex = () => (process.env.NODE_ENV === 'production'
    ? fetch(`${baseUrl}lunr-index.json`).then((content) => content.json())
    : Promise.resolve([])); */

  const { isSearchBarExpanded } = props;

  const loadAlgolia = () => {
    if (!initialized.current && window.__LUNR__ && window.__LUNR__.en) {
      const { index, store } = window.__LUNR__.en;
      initAlgolia(store, index);
      initialized.current = true;
      if (isSearchBarExpanded) {
        searchBarRef.current.focus();
      }
    }
  };

  // const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (isSearchBarExpanded) {
      loadAlgolia();
      searchBarRef.current.focus();
    }
  });

  const toggleSearchIconClick = () => {
    if (isSearchBarExpanded) {
      props.handleSearchBarToggle();
    }
  };

  // if (isSearchBarExpanded) {
  //   searchBarRef.current.focus();
  // }

  /*  const toggleSearchIconClick = () => {
    if (!searchOpen) {
      searchBarRef.current.focus();
    }
    setSearchOpen(!searchOpen);
  }; */

  const style = {
    position: 'absolute',
    right: '50px',
    top: '70px',
    width: '80%',
  };
  if (!isSearchBarExpanded) {
    style.display = 'none';
  }

  return (
    <div className="navbar__search" key="search-box" style={style}>
      {/* <span
        aria-label="expand searchbar"
        role="button"
        className={classnames('search-icon', {
          'search-icon-hidden': isSearchBarExpanded,
        })}
        onClick={toggleSearchIconClick}
        onKeyDown={toggleSearchIconClick}
        tabIndex={0}
      /> */}
      <Input
        id="search_input_react"
        type="search"
        placeholder="Search"
        aria-label="Search"
        className={classnames(
          'navbar__search-input',
          { 'search-bar-expanded': isSearchBarExpanded },
          { 'search-bar': !isSearchBarExpanded },
        )}
        // onClick={loadAlgolia}
        // onMouseOver={loadAlgolia}
        // onFocus={loadAlgolia}
        onBlur={toggleSearchIconClick}
        ref={searchBarRef}
      />
    </div>
  );
};

export default Search;
