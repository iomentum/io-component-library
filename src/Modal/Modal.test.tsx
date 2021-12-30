import React from 'react';
import { render } from '@testing-library/react';
import { Modal, ModalType } from './Modal';

describe('Modal component', () => {
  describe('@snapshots', () => {
    it('should match with the previous Centered Modal snapshot', () => {
      expect(
        render(
          <Modal displayModalState={[true, () => null]}>
            <div>
              <div>
                <h1>Demo header</h1>
                <button type="button">exit cross</button>
              </div>
              <div>content</div>
            </div>
          </Modal>
        ).baseElement
      ).toMatchSnapshot('Centered Modal snapshot');
    });

    it('should match with the previous Left Modal snapshot', () => {
      expect(
        render(
          <Modal type={ModalType.Left} displayModalState={[true, () => null]}>
            <div>
              <div>
                <h1>Demo header</h1>
                <button type="button">exit cross</button>
              </div>
              <div>content</div>
            </div>
          </Modal>
        ).baseElement
      ).toMatchSnapshot('Left Modal snapshot');
    });

    it('should match with the previous Right Modal snapshot', () => {
      expect(
        render(
          <Modal type={ModalType.Right} displayModalState={[true, () => null]}>
            <div>
              <div>
                <h1>Demo header</h1>
                <button type="button">exit cross</button>
              </div>
              <div>content</div>
            </div>
          </Modal>
        ).baseElement
      ).toMatchSnapshot('Right Modal snapshot');
    });
  });
});
