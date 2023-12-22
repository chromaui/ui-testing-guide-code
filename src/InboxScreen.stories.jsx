import { rest } from "msw";

import InboxScreen from "./InboxScreen";

import { Default as TaskListDefault } from "./components/TaskList.stories";

export default {
  component: InboxScreen,
  title: "InboxScreen",
};

export const Default = {
  parameters: {
    msw: {
      handlers: [
        rest.get("/tasks", (req, res, ctx) => {
          return res(ctx.json(TaskListDefault.args));
        }),
      ],
    },
  },
};

export const Error = {
  args: {
    error: "Something",
  },
  parameters: {
    msw: {
      handlers: [
        rest.get("/tasks", (req, res, ctx) => {
          return res(ctx.json([]));
        }),
      ],
    },
  },
};
