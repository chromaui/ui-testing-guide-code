import React from 'react';
import { rest } from 'msw';
import {
  queryByText,
  getByRole,
  waitFor,
  within,
  fireEvent,
} from '@storybook/testing-library';
import { InboxScreen } from './InboxScreen';
import { Default as TaskListDefault } from './components/TaskList.stories';

export default {
  component: InboxScreen,
  title: 'InboxScreen',
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

export const PinATask = {
  ...Default,
  play: async () => {
    await waitFor(() => {
      expect(queryByText('You have no tasks')).not.toBeInTheDocument();
    });

    const getTask = () => getByRole('listitem', { name: 'Export logo' });

    const pinButton = within(getTask()).getByRole('button', { name: 'pin' });

    fireEvent.click(pinButton);
  },
};

export const ArchiveATask = {
  args: {},
};

export const DeleteATask = {
  args: {},
};

export const Error = {
  args: {
    error: 'Something',
  },
  parameters: {
    msw: [
      rest.get('/tasks', (req, res, ctx) => {
        return res(ctx.json([]));
      }),
    ],
  },
};
