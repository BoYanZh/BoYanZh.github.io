import React from 'react';

import * as style from './codeBox.module.less';

const CodeBox = (props) => {
  const { title, children, ...restProps } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <section className={style.codeBox} {...restProps}>
      <section className={style.codeBoxTitle}>
        {title || ''}
      </section>
      <section className={style.codeBoxDescription}>
        {children}
      </section>
    </section>
  );
};

export default CodeBox;
