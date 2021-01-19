import React from 'react';
import style from './codeBox.module.less';

const CodeBox = (props) => {
  const { title, children } = props;
  return (
    <section className={style.codeBox}>
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
