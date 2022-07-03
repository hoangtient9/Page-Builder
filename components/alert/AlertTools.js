import { DnDBuilder, useTools, item, branch } from 'build-ui';
import { Button } from '@nextui-org/react';

const AlertTools = () => {
  const tools = useTools();
  const handleDragTool = () => {
    const alertProps = {
      message: 'How is it going, folk?',
      text: 'Click me',
    };
    const alert = item({
      type: 'Alert',
      props: alertProps,
    });
    const data = branch(alert);
    tools.triggerDragStart({
      data: data,
    });
  };
  return (
    <DnDBuilder
      onDragStart={handleDragTool}
      onDragEnd={tools.handleDragEnd}
      draggable={true}
      //   as="button"
    >
      <Button
        onClick={(e) => {
          e.preventDefault();
        }}
        disabled
      >
        Alert
      </Button>
    </DnDBuilder>
  );
};

export default AlertTools;
