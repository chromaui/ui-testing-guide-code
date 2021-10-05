import React from 'react';
import { rest } from 'msw';
import { LoginScreen } from './LoginScreen';
import { Default as TaskListDefault } from './components/TaskList.stories';
export default {
  component: LoginScreen,
  title: 'LoginScreen',
  parameters: {
    backgrounds: {
      default: 'white',
    },
  },
  argTypes: {
    onLogIn: {
      action: 'onLogIn',
    },
  },
};
export const Default = {
  parameters: {
    msw: [
      rest.get('/tasks', (req, res, ctx) => {
        return res(ctx.json(TaskListDefault.args));
      }),
    ],
  },
};
