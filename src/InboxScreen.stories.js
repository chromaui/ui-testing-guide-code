import React from 'react';
import { rest } from 'msw';
import { within, fireEvent, findByRole } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
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

export const PinTask = Template.bind({});
PinTask.parameters = { ...Default.parameters };
PinTask.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const getTask = (name) => canvas.findByRole('listitem', { name });

  const itemToPin = await getTask('Export logo');
  const pinButton = await findByRole(itemToPin, 'button', { name: 'pin' });
  await fireEvent.click(pinButton);

  const unpinButton = within(itemToPin).getByRole('button', { name: 'unpin' });
  await expect(unpinButton).toBeInTheDocument();
};

export const ArchiveTask = Template.bind({});
ArchiveTask.parameters = { ...Default.parameters };
ArchiveTask.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const getTask = (name) => canvas.findByRole('listitem', { name });

  const itemToArchive = await getTask('QA dropdown');
  const archiveCheckbox = await findByRole(itemToArchive, 'checkbox');
  await fireEvent.click(archiveCheckbox);

  await expect(archiveCheckbox.checked).toBe(true);
};

export const EditTask = Template.bind({});
EditTask.parameters = { ...Default.parameters };
EditTask.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const getTask = (name) => canvas.findByRole('listitem', { name });

  const itemToEdit = await getTask('Fix bug in input error state');
  const taskInput = await findByRole(itemToEdit, 'textbox');
  await fireEvent.change(taskInput, {
    target: { value: 'Fix bug in the textarea error state' },
  });

  const updatedTaskName = 'Fix bug in the form error state';

  fireEvent.change(taskInput, {
    target: { value: 'Fix bug in the textarea error state' },
  });
  await expect(taskInput.value).toBe(updatedTaskName);
};

export const DeleteTask = Template.bind({});
DeleteTask.parameters = { ...Default.parameters };
DeleteTask.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const getTask = (name) => canvas.findByRole('listitem', { name });

  const itemToDelete = await getTask('Build a date picker');
  const deleteButton = await findByRole(itemToDelete, 'button', {
    name: 'delete',
  });
  await fireEvent.click(deleteButton);

  expect(canvas.getAllByRole('listitem').length).toBe(5);
};
