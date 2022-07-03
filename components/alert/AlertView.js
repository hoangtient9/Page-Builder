import { DnDBuilder, useEditor, DnDBuilderHOC, useActions } from 'build-ui';
import Alert from './Alert';
const BuilderAlert = DnDBuilderHOC(Alert);
const AlertView = ({ id, ...props }) => {
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

  return <BuilderAlert onClick={handleSelect} {...props} />;
};

export default AlertView;
