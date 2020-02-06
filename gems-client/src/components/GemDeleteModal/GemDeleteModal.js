import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Octicon, {Trashcan} from "@primer/octicons-react";

const GemDeleteModal = (props) => {
  const {
    className,
    gemId,
    deleteItem
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const deleteItemAndCloseModal = () => {
    deleteItem();
    toggle();
  };

  return (
    <div id={'delete_' + gemId} className='table-icon' onClick={toggle} >
      <Octicon icon={Trashcan} size='small' ariaLabel='Edit'/>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          Вы действительно хотите удалить данный продукт?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteItemAndCloseModal}>Удалить</Button>{' '}
          <Button color="dark" onClick={toggle}>Отменить</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default GemDeleteModal;