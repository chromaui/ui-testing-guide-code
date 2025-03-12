import React from "react";
import Input from "./Input";

export default {
  component: Input,
  title: "Input",
  argTypes: {
    onArchiveTask: { action: "onArchiveTask" },
    onTogglePinTask: { action: "onTogglePinTask" },
    onEditTitle: { action: "onEditTitle" },
  },
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  input: {
    id: "1",
    title: "Buy milk",
    state: "TASK_INBOX",
  },
};
