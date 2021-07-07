import React, { useEffect } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import Alert from "../components/Alert/Alert";
import { alertState } from "../components/Alert/alert.store";

export default {
  title: "C&C/Alert",
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => {
  const setAlert = useSetRecoilState(alertState);

  useEffect(() => {
    setAlert({ isVisible: true });
  }, []);

  return (
    <RecoilRoot>
      <Alert {...args} />
    </RecoilRoot>
  );
};

export const Default = Template.bind({});
Default.args = {};
