import { DnDBuilder, useEditor, DnDBuilderHOC, useActions } from 'build-ui';
import Paragraph from './Paragraph';
const BuilderParagraph = DnDBuilderHOC(Paragraph);
const ParagraphView = ({ id, ...props }) => {
  const editor = useEditor({
    id: id,
  });

  const actions = useActions();

  function handleSelect(event) {
    const noShift = !event.shiftKey;
    if (noShift) {
      // No shift means no
      // multi-select
      actions.unrecorded.triggerListIndexClear({
        name: 'selected',
      });
    }
    actions.unrecorded.triggerIndexAdd({
      id: id,
      name: 'panel',
    });
    actions.unrecorded.triggerListIndexToggle({
      id: id,
      name: 'selected',
    });
    event.stopPropagation();
  }

  return (
    <BuilderParagraph
      // onDragStart={editor.handleDragStart}
      // onDragEnd={editor.handleDragEnd}
      // draggable={true}
      onClick={handleSelect}
      {...props}
    />
  );
};

export default ParagraphView;
