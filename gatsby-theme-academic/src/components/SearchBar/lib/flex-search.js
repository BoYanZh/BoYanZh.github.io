/* eslint-disable */

const getHit = (doc) => {
  const category = doc.path.split('/')[0];
  // const titlePosition = doc.title.
  return {
    hierarchy: {
      lvl0: category,
      lvl1: doc.title,
    },
    url: doc.path,
    _snippetResult: formattedContent
      ? {
          content: {
            value: formattedContent,
            matchLevel: 'full',
          },
        }
      : null,
    _highlightResult: {
      hierarchy: {
        lvl0: {
          value: category,
        },
        lvl1: {
          value: formattedTitle || doc.title,
        },
      },
    },
  };
};

class FlexSearchAdapter {
  constructor(store, index) {
    this.store = store;
    this.index = index;
  }

  search(query) {
    if (!query || !this.index) {
      return [];
    }
    let results = [];
    // search the indexed fields
    Object.keys(this.index).forEach((idx) => {
      results.push(...this.index[idx].values.search(query)); // more search options at https://github.com/nextapps-de/flexsearch#index.search
    });

    // find the unique ids of the nodes
    results = Array.from(new Set(results));

    // return the corresponding nodes in the store
    const nodes = this.store
      .filter((node) => (results.includes(node.id) ? node : null))
      .map((node) => getHit(node.node));

    if (nodes.length > 5) {
      nodes.length = 5;
    }
    return nodes;
  }
}

export default FlexSearchAdapter;
