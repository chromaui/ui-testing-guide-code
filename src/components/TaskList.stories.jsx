import TaskList from "./TaskList";

import * as TaskStories from "./Task.stories";

export default {
  component: TaskList,
  title: "TaskList",
  argTypes: {
    ...TaskStories.argTypes,
  },
};

export const Default = {
  args: {
    tasks: [
      { id: "1", state: "TASK_INBOX", title: "Build a date picker" },
      { id: "2", state: "TASK_INBOX", title: "QA dropdown" },
      {
        id: "3",
        state: "TASK_INBOX",
        title: "Write a schema for account avatar component",
      },
      { id: "4", state: "TASK_INBOX", title: "Export logo" },
      { id: "5", state: "TASK_INBOX", title: "Fix bug in input error state" },
      {
        id: "6",
        state: "TASK_INBOX",
        title: "Draft monthly blog to customers",
      },
    ],
  },
};

export const WithPinnedTasks = {
  args: {
    tasks: [
      {
        id: "6",
        title: "Draft monthly blog to customers",
        state: "TASK_PINNED",
      },
      ...Default.args.tasks.slice(0, 5),
    ],
  },
};
export const Loading = {
  args: {
    tasks: [],
    loading: true,
  },
};
export const Empty = {
  args: {
    ...Loading.args,
    loading: false,
  },
};
