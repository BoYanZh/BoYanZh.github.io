import { Layout } from 'antd';
import { Link } from 'gatsby';
import React, { useRef, useState } from 'react';
import '../../../styles/global.less';

import { useWindowSize } from '../../../utils/hooks';
import Icon from '../../Icon';
import LoadableSearch from '../../SearchBar/loadable';

import * as style from './header.module.less';

export default () => {
  const [menu, setMenu] = useState(false);
  const [isSearchBarExpanded, setSearchBarExpanded] = useState(false);
  // const searchBarRef = useRef(null);

  const [width] = useWindowSize();
  const toggleMenu = () => {
    if (width !== 0 && width <= 768) {
      if (menu) {
        setMenu(false);
      } else {
        setMenu(true);
      }
    }
  };

  const toggleSearchIconClick = (flag) => {
    setSearchBarExpanded(flag);
  };

  const expandSearch = () => {
    toggleSearchIconClick(true);
  };

  const collapseSearch = () => {
    toggleSearchIconClick(false);
  };

  return (
    <>
      <div className={style.circleMenu} role="button" tabIndex="0" onKeyDown={toggleMenu} onClick={toggleMenu}>
        <div className={`${style.hamburger} ${menu ? style.menuIcon : null}`}>
          <div className={style.line} />
          <div className={style.line} />
          <div className={style.hamburgerText}>MENU</div>
        </div>
      </div>
      <Layout className={`${style.navWrap} ${menu ? null : style.hidden} ${menu ? style.openMenu : null}`}>
        <div className={style.backgroundDiv}>
          <ul className={style.nav}>
            <li className={style.navItem}>
              <Link to="/" onClick={toggleMenu} activeClassName={style.anchorActive}>
                About
              </Link>
            </li>
            {/* <li className={style.navItem}> */}
            {/*  <Link to="/contact" onClick={toggleMenu} activeClassName={style.anchorActive}> */}
            {/*    Contact */}
            {/*  </Link> */}
            {/* </li> */}
            <li className={style.navItem}>
              <Link to="/experience/" onClick={toggleMenu} activeClassName={style.anchorActive}>
                Experience
              </Link>
            </li>
            <li className={style.navItem}>
              <Link to="/project/" onClick={toggleMenu} partiallyActive activeClassName={style.anchorActive}>
                Project
              </Link>
            </li>
            {/* <li className={style.navItem}>
              <Link to="/posts/" onClick={toggleMenu} partiallyActive activeClassName={style.anchorActive}>
                Posts
              </Link>
            </li> */}
            <li className={style.navItem} style={{ marginLeft: '1rem' }}>
              <LoadableSearch
                isSearchBarExpanded={isSearchBarExpanded}
                handleSearchBarToggle={collapseSearch}
                // ref={searchBarRef}
              />
              {isSearchBarExpanded
                ? <Icon icon="times" fixedWidth />
                : <Icon icon="search" fixedWidth onMouseDown={expandSearch} />}
            </li>
            {/* <li className={style.navItem}>
              <Link to="/tags" onClick={toggleMenu} activeClassName={style.anchorActive}>
                Tags
              </Link>
            </li>
            <li className={style.navItem}>
              <Link to="/resume" onClick={toggleMenu} activeClassName={style.anchorActive}>
                Resume
              </Link>
            </li> */}
          </ul>
        </div>
      </Layout>
    </>
  );
};
