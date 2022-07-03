import { DnDBuilder, useEditor, DnDBuilderHOC, useActions } from 'build-ui';
import Alert from './Alert';
const AlertReadOnly = ({ id, ...props }) => {
  return <Alert {...props} />;
};

export default AlertReadOnly;
