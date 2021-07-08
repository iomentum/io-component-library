import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { UploadSection } from "../components/UploadSection/UploadSection";

export default {
  title: "C&C/UploadSection",
  component: UploadSection,
} as ComponentMeta<typeof UploadSection>;

const Template: ComponentStory<typeof UploadSection> = (args) => (
  <UploadSection {...args} />
);

export const DefautUsage = Template.bind({});
DefautUsage.args = {
  setImagesReadyForUpload: () => console.log("oui"),
  filesToDisplay: [],
};
