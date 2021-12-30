import React from 'react';
// import { Row, Col } from 'antd';
// import AboutTile from '../../AbouTile';
// import { stripTags, domHtml } from '../../../utils/stripTags';

import { useSiteMetadata } from '../../../utils/hooks';
import Utils from '../../../utils/pageUtils';
import SEO from '../../Seo';

const AboutMe = () => {
  const siteMetadata = useSiteMetadata();
  const description = siteMetadata.introduction.join('\n\n');
  const markdown = Utils.parseMarkDown(description);
  // console.log(markdown);

  return (
    <>
      <div>
        <SEO
          title="About"
          description={description}
          path=""
          keywords={['Rolwin', 'Reevan', 'Monteiro', 'FullStack developer', 'Javascript', 'ReactJS', 'NodeJS', 'Gatsby']}
        />
        <h1 className="titleSeparate">About Me</h1>
        <div dangerouslySetInnerHTML={{ __html: markdown }} />
      </div>
    </>
  );
};
export default AboutMe;
