import { CSSProperties } from 'react';
import { ModalType } from './Modal';

export const getModalStyles = (type: ModalType): CSSProperties => {
  if (type === ModalType.Centered)
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

  return {};
};
