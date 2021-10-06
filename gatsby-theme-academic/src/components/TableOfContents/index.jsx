import classnames from 'classnames';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

import { useSiteMetadata } from '../../utils/hooks';

import * as styles from './toc.module.less';

const TOCItem = (props) => {
  const {
    data: {
      items,
      title,
      url,
    },
    activeUrls,
    setActiveTOC,
    depth,
  } = props;
  const { tocMaxDepth } = useSiteMetadata();
  const classNames = [];
  let childActiveUrls = [];
  if (activeUrls.length > 0 && activeUrls[0] === url) {
    classNames.push(styles.tocActive);
    if (activeUrls.length === 1) {
      classNames.push(styles.tocCurrent);
    } else {
      childActiveUrls = activeUrls.slice(1);
    }
  }
  const handleClick = () => {
    setActiveTOC(url);
  };
  return (
    <>
      <li key={url} title={title}>
        <a
          style={{ paddingLeft: `${depth + 1}em` }}
          href={url}
          className={classnames(classNames)}
          onClick={handleClick}
        >
          {title}
        </a>
      </li>
      {items && depth < tocMaxDepth ? items.map((item) => (
        <TOCItem
          key={item.url}
          data={item}
          activeUrls={childActiveUrls}
          setActiveTOC={setActiveTOC}
          depth={depth + 1}
        />
      )) : null}
    </>
  );
};

const TableOfContents = (props) => {
  const { tableOfContents, mainSidebar } = props;
  const items = tableOfContents.items || [];
  const mainSidebarHeight = mainSidebar ? mainSidebar.current.clientHeight : 0;

  const calculateOffsets = () => {
    // eslint-disable-next-line no-underscore-dangle
    const _offsets = [];
    const preorderTraversal = (root, parent) => {
      if (root.url) {
        const element = window.document.getElementById(root.url.substring(1));
        if (element) {
          const id = _offsets.length;
          _offsets.push({
            parent,
            offset: element.offsetTop,
            url: root.url,
          });
          if (root.items) {
            root.items.forEach((item) => preorderTraversal(item, id));
          }
        }
      }
    };
    items.forEach((item) => preorderTraversal(item, -1));
    // console.log(_offsets);
    return _offsets;
    // return _.sortBy(_offsets, (value) => value.offset);
  };

  const [offsets, setOffsets] = useState(calculateOffsets);

  const getActiveUrls = (position) => {
    // const position = window.pageYOffset; // + window.innerHeight * 0.2;
    // console.log(position);
    let index = _.sortedIndexBy(offsets, { offset: position }, (value) => value.offset);
    if (index > 0) {
      --index;
    }
    const urls = [];
    while (index >= 0 && index < offsets.length) {
      // console.log(index, offsets[index]);
      urls.unshift(offsets[index].url);
      index = offsets[index].parent;
    }
    return urls;
  };

  const [activeTOC, setActiveTOC] = useState({
    urls: getActiveUrls(window.pageYOffset),
    clickTime: 0,
  });

  const setActiveTOCByClick = (url) => {
    const currentOffset = window.pageYOffset;
    const newOffset = window.document.getElementById(url.substring(1)).offsetTop;
    const diff = Math.abs(currentOffset - newOffset) || 0;
    const time = Date.now() + 500 + diff / 5;
    const activeUrls = getActiveUrls(newOffset + 1);
    setActiveTOC({
      urls: activeUrls,
      clickTime: time,
    });
  };

  const calculateHeight = () => Math.max(200, window.innerHeight - mainSidebarHeight - 175);
  const [height, setHeight] = useState(calculateHeight());

  useEffect(() => {
    const handleScroll = () => {
      if (Date.now() > activeTOC.clickTime) {
        const activeUrls = getActiveUrls(window.pageYOffset);
        setActiveTOC({
          urls: activeUrls,
          clickTime: activeTOC.clickTime,
        });
      }
    };

    const events = fromEvent(window.document, 'scroll');
    const event = events.pipe(throttleTime(300));
    const subscription = event.subscribe(handleScroll);

    return () => {
      subscription.unsubscribe();
    };
  }, [activeTOC]);

  useEffect(() => {
    const handleResize = () => {
      setHeight(calculateHeight());
      setOffsets(calculateOffsets());
    };

    const events = fromEvent(window, 'resize');
    const event = events.pipe(throttleTime(300));
    const subscription = event.subscribe(handleResize);

    return () => {
      subscription.unsubscribe();
    };
  }, [offsets, height]);

  // console.log(activeTOC.urls);

  return (
    <div className={styles.tocContainer} style={{ height }}>
      <h3>Table of Contents</h3>
      <ul className={styles.toc}>
        {items.map((item) => (
          <TOCItem
            key={item.url}
            data={item}
            activeUrls={activeTOC.urls}
            setActiveTOC={setActiveTOCByClick}
            depth={0}
          />
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
