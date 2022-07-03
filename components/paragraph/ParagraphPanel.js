import { Input } from '@nextui-org/react';
import { useEditor, useActions, useCollector } from 'build-ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { EditorState } from 'draft-js';
import { convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const ParagraphPanel = ({ id, ...props }) => {
  const editor = useEditor({
    id: id,
  });

  const actions = useActions();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const nodeSelector = (selectors) => selectors.selectById(id);
  const collected = useCollector({
    selector: nodeSelector,
  });

  const update = useCallback(() => {
    console.log(editor);
    const contentState = convertFromRaw(editor.props);
    const stateWithContent = EditorState.createWithContent(contentState);
    setEditorState(stateWithContent);
  }, [editor.props, id]);
  useEffect(() => {
    update();
  }, [update]);

  const onEditorStateChange = (values) => {
    console.log('123');
    actions.timeBatched.triggerUpdate({
      id: id,
      props: convertToRaw(values.getCurrentContent()),
    });
    setEditorState(values);
  };

  const edit = useMemo(
    () => (
      <Editor
        editorState={editorState}
        key={`editor-${id}`}
        onEditorStateChange={onEditorStateChange}
        name="text"
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'fontFamily',
            'list',
            'textAlign',
            'colorPicker',
            'link',
            'embedded',
            'emoji',
            'image',
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
        }}
        toolbarClassName="toolbar-class"
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        preserveSelectionOnBlur={true}
      />
    ),
    [editorState, id]
  );

  return <div>{edit}</div>;
};

export default ParagraphPanel;
