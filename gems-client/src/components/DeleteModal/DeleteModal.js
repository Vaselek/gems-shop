import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import Octicon, {Trashcan} from "@primer/octicons-react";

const DeleteModal = (props) => {
  const {
    itemId,
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
    <div id={'delete_' + itemId} className='basic-table-icon' onClick={toggle} >
      <Octicon icon={Trashcan} size='small' ariaLabel='Edit'/>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          Вы действительно хотите удалить?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteItemAndCloseModal}>Удалить</Button>{' '}
          <Button color="dark" onClick={toggle}>Отменить</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteModal;