import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Dropzone from "../components/Dropzone/Dropzone";

export default {
  title: "C&C/Dropzone",
  component: Dropzone,
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
} as ComponentMeta<typeof Dropzone>;

const Template: ComponentStory<typeof Dropzone> = (args) => (
  <Dropzone {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  setImageToUpload: () => console.log("setImageToUpload"),
  setUploadError: () => console.log("setUploadError"),
};
