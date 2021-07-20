import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MyCalendar } from "./MyCalendar";
import * as m from "moment";
import { extendMoment } from "moment-range";
import { Display } from "./utils";
const moment = extendMoment(m);

export default {
  title: "C&C/MyCalendar",
  component: MyCalendar,
} as ComponentMeta<typeof MyCalendar>;

const Template: ComponentStory<typeof MyCalendar> = (args) => (
  <MyCalendar {...args}/>
);

export const Primary = Template.bind({});
Primary.args = {
  date: moment(),
  display: Display.Week
};
