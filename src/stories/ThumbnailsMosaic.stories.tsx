import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ThumbnailsMosaic } from "../components/ThumbnailsMosaic/ThumbnailsMosaic";

export default {
  title: "C&C/ThumbnailsMosaic",
  component: ThumbnailsMosaic,
} as ComponentMeta<typeof ThumbnailsMosaic>;

const Template: ComponentStory<typeof ThumbnailsMosaic> = (args) => (
  <ThumbnailsMosaic {...args} />
);

export const BasicList = Template.bind({});
BasicList.args = {
  fileList: [
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
