import { DnDBuilder, useEditor } from 'build-ui';
import Section from './Section';

const SectionView = ({ id, ...props }) => {
  const editor = useEditor({
    id: id,
  });
  return (
    <DnDBuilder onDrop={editor.handleDrop}>
      <Section {...props} />
    </DnDBuilder>
  );
};

export default SectionView;
