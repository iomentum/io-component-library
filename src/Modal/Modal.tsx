import React, { Dispatch, SetStateAction } from 'react';
import { Modal as ModalMui, Paper, Slide, withStyles } from '@material-ui/core';
import { getModalStyles } from './Modal.style';

export enum ModalType {
  Centered,
  Left,
  Right,
}

type ModalProps = {
  children: JSX.Element;
  type?: ModalType;
  displayModalState: [boolean, Dispatch<SetStateAction<boolean>>];
  onClose?: () => void;
};

export const Modal = ({ children, type, displayModalState, onClose }: ModalProps) => {
  const [isOpen, setIsOpen] = displayModalState;

  const closeModal = () => {
    onClose();
    setIsOpen(false);
  };

  const StyledSlide = withStyles({
    root: {
      outline: 'none',
      borderRadius: type === ModalType.Centered ? 20 : 0,
      height: type === ModalType.Centered ? 'none' : '100vh',
      maxHeight: type === ModalType.Centered ? '70vh' : '100vh',
      width: '70vw',
      position: type === ModalType.Centered ? 'relative' : 'absolute',
      right: type === ModalType.Right ? 0 : 'auto',

      overflowY: 'scroll',
      scrollbarWidth: 'none',
      // TODO: hide scrollbare on Chrome
    },
  })(Slide); // TODO: export in style files when I remember how to pass type as props

  const direction = () => {
    if (type === ModalType.Left) return 'right';
    if (type === ModalType.Right) return 'left';
    return 'up';
  };

  return (
    <ModalMui open={isOpen} onClose={closeModal} style={getModalStyles(type)}>
      <StyledSlide direction={direction()} in={isOpen}>
        <Paper>{children}</Paper>
      </StyledSlide>
    </ModalMui>
  );
};

Modal.defaultProps = {
  type: ModalType.Centered,
  onClose: () => null,
};
