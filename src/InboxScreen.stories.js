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
  play: async () => {
    await waitFor(() => {
      expect(queryByText('You have no tasks')).not.toBeInTheDocument();
    });

    const getTask = (name) => getByRole('listitem', { name });

    // Pin
    const pinButton = within(getTask('Export logo')).getByRole('button', {
      name: 'pin',
    });
    fireEvent.click(pinButton);

    // Archive
    const archiveCheckbox = within(getTask('QA dropdown')).getByRole(
      'checkbox'
    );
    fireEvent.click(archiveCheckbox);

    // Edit
    const taskInput = within(getTask('Fix bug in input error state')).getByRole(
      'textbox'
    );
    fireEvent.change(taskInput, {
      target: { value: 'Fix bug in the textarea error state' },
    });

    // Delete
    const deleteButton = within(getTask('Build a date picker')).getByRole(
      'button',
      {
        name: 'delete',
      }
    );
    fireEvent.click(deleteButton);
  },
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
