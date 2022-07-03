import { Input } from '@nextui-org/react';
import { useEditor } from 'build-ui';

const AlertPanel = ({ id }) => {
  const editor = useEditor({
    id: id,
  });
  console.log(id);

  return (
    <div>
      <div>
        <Input
          clearable
          bordered
          color="primary"
          name="message"
          id="message"
          value={editor.props.message}
          onChange={(e, p) => {
            console.log(e, p);
          }}
          label="Alert Message"
        />
      </div>
      <div>
        <Input
          clearable
          bordered
          color="primary"
          name="text"
          id="text"
          value={editor.props.text}
          onChange={editor.handleUpdate}
          label="Alert Text"
        />
      </div>
    </div>
  );
};

export default AlertPanel;
