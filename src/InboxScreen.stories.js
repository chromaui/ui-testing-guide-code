
import React from 'react';
import { rest } from 'msw';
import { mswDecorator } from 'msw-storybook-addon';
import { InboxScreen } from './InboxScreen';
import { Default as TaskListDefault } from './components/TaskList.stories';

import { within, userEvent, findByRole } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  component: InboxScreen,
  title: 'InboxScreen',
  decorators: [
    mswDecorator,
  ],
};

const Template = (args) => <InboxScreen {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [
      rest.get('/tasks', (req, res, ctx) => {
        return res(ctx.json(TaskListDefault.args));
      }),
    ],
  },
};

export const Error = Template.bind({});
Error.args = {
  error: 'Something',
};
Error.parameters = {
  msw: {
    handlers: [
      rest.get('/tasks', (req, res, ctx) => {
        return res(ctx.json([]));
      }),
    ],
  },
};

// 置顶
export const PinTask = Template.bind({});
PinTask.parameters = Default.parameters;
PinTask.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const getTask = (name) => canvas.findByRole('listitem', { name });

  // Find the task to pin
  const itemToPin = await getTask('Export logo');

  // Find the pin button
  const pinButton = await findByRole(itemToPin, 'button', { name: 'pin' });

  // Click the pin button
  await userEvent.click(pinButton);

  // Check that the pin button is now a unpin button
  const unpinButton = within(itemToPin).getByRole('button', { name: 'unpin' });
  await expect(unpinButton).toBeInTheDocument();
};

// 归档
export const ArchiveTask = Template.bind({});
ArchiveTask.parameters = Default.parameters;
ArchiveTask.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const getTask = (name) => canvas.findByRole('listitem', { name });

  const itemToArchive = await getTask('QA dropdown');
  const archiveCheckbox = await findByRole(itemToArchive, 'checkbox');
  await userEvent.click(archiveCheckbox);

  await expect(archiveCheckbox.checked).toBe(true);
};

// 编辑
export const EditTask = Template.bind({});
EditTask.parameters = Default.parameters;
EditTask.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const getTask = (name) => canvas.findByRole('listitem', { name });

  const itemToEdit = await getTask('Fix bug in input error state');
  const taskInput = await findByRole(itemToEdit, 'textbox');

  await userEvent.type(taskInput, ' and disabled state');
  await expect(taskInput.value).toBe('Fix bug in input error state and disabled state');
};
