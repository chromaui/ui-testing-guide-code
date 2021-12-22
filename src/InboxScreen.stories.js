import React from 'react';
import { rest } from 'msw';
import { within, fireEvent, findByRole } from '@storybook/testing-library';
import { InboxScreen } from './InboxScreen';
import { Default as TaskListDefault } from './components/TaskList.stories';

export default {
  component: InboxScreen,
  title: 'InboxScreen',
};

const Template = (args) => <InboxScreen {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  msw: [
    rest.get('/tasks', (req, res, ctx) => {
      return res(ctx.json(TaskListDefault.args));
    }),
  ],
};

export const Error = Template.bind({});
Error.args = {
  error: 'Something',
};
Error.parameters = {
  msw: [
    rest.get('/tasks', (req, res, ctx) => {
      return res(ctx.json([]));
    }),
  ],
};

export const UpdateTasks = Template.bind({});
UpdateTasks.parameters = { ...Default.parameters };
UpdateTasks.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const getTask = (name) => canvas.findByRole('listitem', { name });

  // Pin
  const itemToPin = await getTask('Export logo');
  const pinButton = await findByRole(itemToPin, 'button', { name: 'pin' });
  await fireEvent.click(pinButton);

  // Archive
  const itemToArchive = await getTask('QA dropdown');
  const archiveCheckbox = await findByRole(itemToArchive, 'checkbox');
  await fireEvent.click(archiveCheckbox);

  // Edit
  const itemToEdit = await getTask('Fix bug in input error state');
  const taskInput = await findByRole(itemToEdit, 'textbox');
  await fireEvent.change(taskInput, {
    target: { value: 'Fix bug in the textarea error state' },
  });

  // Delete
  const itemToDelete = await getTask('Build a date picker');
  const deleteButton = await findByRole(itemToDelete, 'button', {
    name: 'delete',
  });
  await fireEvent.click(deleteButton);
};
