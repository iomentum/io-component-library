import React, { useContext } from 'react';
import { Button, Modal, Slide } from '@material-ui/core';
import { SideModalContent } from '../MyCalendar.style';
import { EventContext } from '../contexts/EventContext';

interface SideModalProps {
  onSave: () => void;
  children: JSX.Element[];
}

export const SideModal = (props: SideModalProps) => {
  const { eventManagementOpened: openedModal, setEventManagementOpened: setOpenModal } =
    useContext(EventContext);

  const handleOnSave = () => {
    props.onSave();
    setOpenModal(false);
  };

  return (
    <Modal open={openedModal} onClose={() => setOpenModal(false)}>
      <Slide direction="left" in={openedModal}>
        <SideModalContent elevation={1}>
          {props.children}
          <Button variant="contained" color="primary" onClick={handleOnSave}>
            Save
          </Button>
        </SideModalContent>
      </Slide>
    </Modal>
  );
};
