import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import styles from './toc.module.less';
/* const generateTOCHelper = (data, level) => {
  const { items, title, url } = data;
  let markdown = '';
  if (title && url) {
    markdown += `${_.repeat('  ', level)}- [${title}](${url})\n\n`;
  }
  if (items) {
    items.forEach((item) => {
      markdown += generateTOCHelper(item, level + 1);
    });
  }
  return markdown;
};

const generateTOC = (data) => {
  const { items } = data;
  let markdown = '';
  if (items) {
    items.forEach((item) => {
      markdown += generateTOCHelper(item, 0);
    });
  }
  return markdown;
}; */

const TOCItem = (props) => {
  const { data: { items, title, url }, activeTOC, setActiveTOC } = props;
  // console.log(url);
  const className = activeTOC.url === url ? styles.tocCurrent : '';
  const handleClick = () => {
    setActiveTOC(url);
  };
  return (
    <li key={url} title={title}>
      <a href={url} className={className} onClick={handleClick}>{title}</a>
    </li>
  );
};

const TableOfContents = (props) => {
  const { tableOfContents } = props;
  // console.log(tableOfContents);
  // const toc = generateTOC(tableOfContents);
  // const markdown = Utils.parseMarkDown(toc);
  // console.log(markdown);
  const items = tableOfContents.items || [];

  const calculateOffsets = () => {
    // eslint-disable-next-line no-underscore-dangle
    const _offsets = [];
    items.forEach((item) => {
      // console.log(item);
      if (item.url) {
        const element = window.document.getElementById(item.url.substring(1));
        if (element) {
          _offsets.push({
            offset: element.offsetTop,
            url: item.url,
          });
        }
      }
    });
    return _.sortBy(_offsets, (value) => value.offset);
  };

  const [offsets, setOffsets] = useState(calculateOffsets);

  const getActiveUrl = () => {
    const position = window.pageYOffset; // + window.innerHeight * 0.2;
    // console.log(position);
    let index = _.sortedIndexBy(offsets, { offset: position }, (value) => value.offset);
    if (index > 0) {
      --index;
    }
    return offsets.length > index ? offsets[index].url : null;
  };

  const [activeTOC, setActiveTOC] = useState({
    url: getActiveUrl(),
    clickTime: 0,
  });

  const setActiveTOCByClick = (url) => {
    setActiveTOC({ url, clickTime: Date.now() });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (Date.now() > activeTOC.clickTime + 500) {
        const active = getActiveUrl();
        setActiveTOC({ url: active, clickTime: activeTOC.clickTime });
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
      setOffsets(calculateOffsets());
    };

    const events = fromEvent(window, 'resize');
    const event = events.pipe(throttleTime(300));
    const subscription = event.subscribe(handleResize);

    return () => {
      subscription.unsubscribe();
    };
  }, [offsets]);

  return (
    <div className={styles.tocContainer}>
      <h3>Table of Contents</h3>
      <ul className={styles.toc}>
        {items.map((item) => (
          <TOCItem
            data={item}
            activeTOC={activeTOC}
            setActiveTOC={setActiveTOCByClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
