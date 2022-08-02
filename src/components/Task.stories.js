import { Task } from "./Task";

const actions = ["onArchiveTask", "onTogglePinTask", "onEditTitle"];

const argTypes = actions.reduce(
  (all, action) => ({ ...all, [action]: { action } }),
  {}
);

export default {
  component: Task,
  title: "Task",
  argTypes,
};

const Template = Task;

export const Default = Template.bind({});
Default.args = {
  task: {
    id: "1",
    title: "Buy chockolate milk",
    state: "TASK_INBOX",
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    id: "2",
    title: "Learn to code",
    state: "TASK_PINNED",
  },
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    id: "3",
    title: "Eat",
    state: "TASK_ARCHIVED",
  },
};

const longTitleString = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star`;

export const LongTitle = Template.bind({});
LongTitle.args = {
    task: {
        id: '4', 
        title: longTitleString,
        state: 'TASK_INBOX',
    },
};