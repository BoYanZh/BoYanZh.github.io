/* eslint-disable func-names */
/* Vendor imports */
import React from 'react';
// import PropTypes from 'prop-types';
/* App imports */
// import { useSiteMetadata } from '../../utils/hooks';

const Comment = () => {
  // const { pageCanonicalUrl, pageId } = props;
  // const siteMetadata = useSiteMetadata();
  //
  // useEffect(() => {
  //   if (window.DISQUS) {
  //     window.DISQUS.reset({
  //       reload: true,
  //       config() {
  //         this.page.url = pageCanonicalUrl;
  //         this.page.identifier = pageId;
  //       },
  //     });
  //   } else {
  //     window.disqus_config = () => {
  //       this.page.url = pageCanonicalUrl;
  //       this.page.identifier = pageId;
  //     };
  //     (function () {
  //       // eslint-disable-next-line no-undef
  //       const d = document;
  //       const s = d.createElement('script');
  //       s.src = siteMetadata.disqusScript;
  //       s.setAttribute('data-timestamp', +new Date());
  //       (d.head || d.body).appendChild(s);
  //     }());
  //   }
  // });

  return (
    <div>
      <div id="disqus_thread" />
    </div>
  );
};

// Comment.propTypes = {
//   pageCanonicalUrl: PropTypes.string.isRequired,
//   pageId: PropTypes.string.isRequired,
// };

export default Comment;
