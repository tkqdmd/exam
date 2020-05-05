import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const ErrorAlert = (props) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);
    console.log(props.errorState);
    
  return (
    <Alert color="info" isOpen={visible} toggle={onDismiss}>
        {props.errorMessage}
    </Alert>
  );
}

export default ErrorAlert;