import React, { useContext } from 'react';
import { Modal, Slide, Button } from '@material-ui/core';
import { SideModalContent, PrimaryButton } from './SideModal.style';
import { EventContext } from '../contexts/EventContext';
import { Row, Gap } from './common.style';

interface SideModalProps {
  onSave: () => void;
  onDelete: () => void;
  children: JSX.Element[];
  isEventExisting: boolean;
}

export const SideModal = (props: SideModalProps) => {
  const { onSave, onDelete, children, isEventExisting } = props;

  const { eventManagementOpened: openedModal, setEventManagementOpened: setOpenModal } =
    useContext(EventContext);

  const handleOnSave = () => {
    onSave();
    setOpenModal(false);
  };

  const handleOnDelete = () => {
    onDelete();
    setOpenModal(false);
  };

  return (
    <Modal open={openedModal} onClose={() => setOpenModal(false)}>
      <Slide direction="left" in={openedModal}>
        <SideModalContent elevation={1}>
          <div>{children}</div>
          <Row>
            <PrimaryButton variant="contained" color="primary" onClick={handleOnSave}>
              Save
            </PrimaryButton>
            {isEventExisting && (
              <>
                <Gap />
                <Button variant="contained" color="secondary" onClick={handleOnDelete}>
                  Delete
                </Button>
              </>
            )}
          </Row>
        </SideModalContent>
      </Slide>
    </Modal>
  );
};
