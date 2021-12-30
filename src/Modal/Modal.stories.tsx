import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Modal, ModalType } from './Modal';

export default {
  title: 'Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Centered = Template.bind({});
Centered.args = {
  children: <div>content</div>,
  displayModalState: [true, () => null],
};

export const Left = Template.bind({});
Left.args = {
  type: ModalType.Left,
  children: <div>content</div>,
  displayModalState: [true, () => null],
};

export const Right = Template.bind({});
Right.args = {
  type: ModalType.Right,
  children: <div>content</div>,
  displayModalState: [true, () => null],
};
