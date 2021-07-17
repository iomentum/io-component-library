import React, { Dispatch, memo, SetStateAction } from "react";
import { Button, Modal, Slide } from "@material-ui/core";
import { SideModalContent } from "./MyCalendar.style";

export enum OpeningDirection {
  Left = "left",
  Right = "right",
  Up = "up",
  Down = "down",
}

interface SideModalProps {
  openState: [boolean, Dispatch<SetStateAction<boolean>>];
  openingDirection: OpeningDirection;
  onSave: () => void;
  children: JSX.Element[];
}

export const SideModal = memo((props: SideModalProps) => {
  const [openModal, setOpenModal] = props.openState;

  const handleOnSave = () => {
    props.onSave();
    setOpenModal(false);
  }

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Slide direction={props.openingDirection} in={openModal}>
        <SideModalContent elevation={1}>
          {props.children}
          <Button
            variant="contained"
            color="primary"
            onClick={handleOnSave}
          >
            Save
          </Button>
        </SideModalContent>
      </Slide>
    </Modal>
  );
});
