export const stripTags = (ipStr) => {
  let str = ipStr;
  if (str === null || str === '') {
    return false;
  }

  str = str.toString();

  return str.replace(/(<([^>]+)>)/gi, '');
};

export const domHtml = (str) => ({ __html: str });
