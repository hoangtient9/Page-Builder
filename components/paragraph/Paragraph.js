import { Text } from '@nextui-org/react';
import { EditorState, convertFromRaw } from 'draft-js';
import dynamic from 'next/dynamic';
import { forwardRef } from 'react';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Paragraph = forwardRef(({ blocks, entityMap, ...otherProps }, ref) => {
  const contentState = convertFromRaw({ blocks, entityMap });
  const editorState = EditorState.createWithContent(contentState);
  return (
    <div {...otherProps} ref={ref}>
      <Editor editorState={editorState} readOnly={true} toolbarHidden />
    </div>
  );
});

export default Paragraph;
