import { useEffect } from 'react';
import AlertView from '../components/alert/AlertReadOnly';
import SectionView from '../components/SectionView';
import ParagraphView from '../components/paragraph/ParagraphReadOnly';
import { useBuilder, Workspace } from 'build-ui';

const ViewContainer = ({ data }) => {
  const builder = useBuilder();
  const { loadTree } = builder;

  useEffect(() => {
    if (data.length > 0) {
      loadTree(JSON.parse(data[0].data));
    }
  }, []);
  const view = {
    Section: SectionView,
    Alert: AlertView,
    Paragraph: ParagraphView,
  };
  return <Workspace view={view} />;
};

export default ViewContainer;
