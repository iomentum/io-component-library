import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Requirements } from "../components/Requirements";

export default {
  title: "Components/Requirements",
  component: Requirements,
} as ComponentMeta<typeof Requirements>;

const Template: ComponentStory<typeof Requirements> = () => <Requirements />;

export const Demo = Template.bind({});
Demo.args = {};
