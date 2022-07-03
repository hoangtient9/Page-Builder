import { DnDBuilder, useTools, item, branch, useActions } from 'build-ui';
import { Text } from '@nextui-org/react';
import { EditorState, convertFromRaw } from 'draft-js';
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const ParagraphTools = () => {
  const tools = useTools();
  const paragraphProps = {
    entityMap: {},
    blocks: [
      {
        key: '637gr',
        text: 'Paragraph',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
  };
  const handleDragTool = () => {
    const paragraph = item({
      type: 'Paragraph',
      props: paragraphProps,
    });
    const data = branch(paragraph);
    tools.triggerDragStart({
      data: data,
    });
  };
  const contentState = convertFromRaw(paragraphProps);
  const editorState = EditorState.createWithContent(contentState);
  return (
    <DnDBuilder
      onDragStart={handleDragTool}
      onDragEnd={tools.handleDragEnd}
      draggable={true}
    >
      <Editor editorState={editorState} readOnly={true} toolbarHidden />
    </DnDBuilder>
  );
};

export default ParagraphTools;
