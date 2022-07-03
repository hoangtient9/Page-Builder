import dynamic from 'next/dynamic';
import { Panel } from 'build-ui';

const PanelContainer = (props) => {
  const view = {
    Alert: dynamic(() => import('./alert/AlertPanel')),
    Paragraph: dynamic(() => import('./paragraph/ParagraphPanel')),
  };
  return <Panel view={view} {...props} />;
};

export default PanelContainer;
