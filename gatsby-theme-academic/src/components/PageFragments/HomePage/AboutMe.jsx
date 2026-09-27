import React from 'react';

import { useSiteMetadata } from '../../../utils/hooks';
import Utils from '../../../utils/pageUtils.mjs';
import SEO from '../../Seo';

const AboutMe = () => {
  const siteMetadata = useSiteMetadata();
  const description = siteMetadata.introduction.join('\n\n');
  const markdown = Utils.parseMarkDown(description);
  // console.log(markdown);
  return (
    <div>
      <h1 className="titleSeparate">About Me</h1>
      <div className="markdown-body" dangerouslySetInnerHTML={{ __html: markdown }} />
    </div>
  );
};
export default AboutMe;
