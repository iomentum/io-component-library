import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Display, EventsCollection, MyCalendar } from "./MyCalendar";
import * as m from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(m);
import Dayz from "dayz";

export default {
  title: "Example/MyCalendar",
  component: MyCalendar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof MyCalendar>;

const Template: ComponentStory<typeof MyCalendar> = (args) => (
  <MyCalendar {...args} />
);

const EVENTS: EventsCollection[] = new Dayz.EventsCollection([
  {
    content: "Weeklong",
    range: moment.range(moment(), moment().endOf("day")),
  },
  {
    content: "9am - 2pm",
    range: moment.range(moment().hour(9), moment().hour(14)),
  },
  {
    content: "8am - 8pm",
    range: moment.range(moment().hour(8), moment().hour(21).minutes(40)),
  },
]);

const EVENTS_2: EventsCollection[] = new Dayz.EventsCollection([
  {
    content: "8am - 8pm",
    range: moment.range(moment().hour(8), moment().hour(21).minutes(40)),
  },
]);

export const Primary = Template.bind({});
Primary.args = {
  date: moment(),
  display: Display.Week,
  events: EVENTS
};

export const Secondary = Template.bind({});
Secondary.args = {
  date: moment(),
  display: Display.Day,
  events: EVENTS_2
};
