import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Dropzone from "./Dropzone";

export default {
  title: "C&C/Dropzone",
  component: Dropzone,
} as ComponentMeta<typeof Dropzone>;

const Template: ComponentStory<typeof Dropzone> = (args) => (
  <Dropzone {...args} />
);

export const DropArea = Template.bind({});
DropArea.args = {
  setImagesToUpload: () => console.log("setImageToUpload"),
  setUploadError: () => console.log("setUploadError"),
  label: "Importez votre image",
  style: { color: "dodgerblue", fontSize: 12 },
};
