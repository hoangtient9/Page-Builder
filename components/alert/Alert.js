import { Button } from '@nextui-org/react';
import { forwardRef } from 'react';

const Alert = forwardRef(({ message, text, ...rest }, ref) => {
  const handleAlert = () => {
    alert(message);
  };
  return (
    <Button onClick={handleAlert} {...rest} ref={ref}>
      {text}
    </Button>
  );
});

export default Alert;
