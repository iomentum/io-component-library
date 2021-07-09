import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { UploadSection } from "./UploadSection";

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
  filesToDisplay: [
    {
      name: "Jérémy",
      url: "https://www.iomentum.com/static/media/jeremy.44e055de.jpg",
    },
    {
      name: "Rabire",
      url: "https://www.iomentum.com/static/media/rabire.01c6c5ba.jpg",
    },
    {
      name: "Léo",
      url: "https://www.iomentum.com/static/media/leopold.0ae3e142.jpg",
    },
  ],
  style: { backgroundColor: "pink" },
};
