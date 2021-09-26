import Loadable from '@loadable/component';

const LoadableTableOfContents = Loadable(() => import('./index'));
export default LoadableTableOfContents;
