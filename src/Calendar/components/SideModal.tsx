import React, { useContext } from 'react';
import { Modal, Slide } from '@material-ui/core';
import { SideModalContent } from './SideModal.style';
import { EventContext } from '../contexts/EventContext';

interface SideModalProps {
  children: JSX.Element[];
}

export const SideModal = (props: SideModalProps) => {
  const { eventManagementOpened: openedModal, setEventManagementOpened: setOpenModal } =
    useContext(EventContext);

  return (
    <Modal open={openedModal} onClose={() => setOpenModal(false)}>
      <Slide direction="left" in={openedModal}>
        <SideModalContent elevation={1}>{props.children}</SideModalContent>
      </Slide>
    </Modal>
  );
};
