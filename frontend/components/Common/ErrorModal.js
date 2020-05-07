import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ErrorModal = (props) => {
   
  return (
    <div>
      <Modal isOpen={props.errorState} toggle={props.hideModal}>
        <ModalHeader toggle={props.hideModal}>Error</ModalHeader>
        <ModalBody>
          {props.errorMessage}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.hideModal}>OK</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ErrorModal;