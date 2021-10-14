import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import 'academicons';

library.add(fas, fab, far);

const Icon = (props) => {
  const { icon, size, fixedWidth } = props;
  if (icon[0] === 'ai') {
    const sizeClass = size ? `ai-${size}` : '';
    const iconClass = icon[1] ? `ai-${icon[1]}` : '';
    const fwClass = fixedWidth ? 'ai-fw' : '';
    return <i className={`ai ${iconClass} ${sizeClass} ${fwClass}`} />;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <FontAwesomeIcon {...props} />;
};

export default Icon;
