import React from 'react';
import _ from 'lodash';
import Utils from '../../utils/pageUtils';

const generateTOCHelper = (data, level) => {
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
};

const TableOfContents = (data) => {
  const { tableOfContents } = data;
  const toc = generateTOC(tableOfContents);
  console.log(toc);
  const markdown = Utils.parseMarkDown(toc);
  console.log(markdown);
  return <div dangerouslySetInnerHTML={{ __html: markdown }} />;
};

export default TableOfContents;
