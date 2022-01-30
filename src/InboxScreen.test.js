import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import * as stories from './InboxScreen.stories';
import { composeStories } from '@storybook/testing-react';
import { cleanup, fireEvent, render, waitFor, within } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { getWorker } from 'msw-storybook-addon';

expect.extend(toHaveNoViolations);

describe('InboxScreen', () => {
  afterEach(() => {
    cleanup();
  });

  afterAll(() => getWorker().close());

  const { Default } = composeStories(stories);

  it('Should have no accessibility violations', async () => {
    const { container, queryByText } = render(<Default />);

    await waitFor(() => {
      expect(queryByText('You have no tasks')).not.toBeInTheDocument();
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should pin a task', async () => {
    const { queryByText, getByRole } = render(<Default />);

    await waitFor(() => {
      expect(queryByText('You have no tasks')).not.toBeInTheDocument();
    });

    const getTask = () => getByRole('listitem', { name: 'Export logo' });

    const pinButton = within(getTask()).getByRole('button', { name: 'pin' });

    fireEvent.click(pinButton);

    const unpinButton = within(getTask()).getByRole('button', { name: 'unpin' });

    expect(unpinButton).toBeInTheDocument();
  });

  it('should archive a task', async () => {
    const { queryByText, getByRole } = render(<Default />);

    await waitFor(() => {
      expect(queryByText('You have no tasks')).not.toBeInTheDocument();
    });

    const task = getByRole('listitem', { name: 'QA dropdown' });
    const archiveCheckbox = within(task).getByRole('checkbox');
    expect(archiveCheckbox.checked).toBe(false);

    fireEvent.click(archiveCheckbox);
    expect(archiveCheckbox.checked).toBe(true);
  });

  it('should edit a task', async () => {
    const { queryByText, getByRole } = render(<Default />);

    await waitFor(() => {
      expect(queryByText('You have no tasks')).not.toBeInTheDocument();
    });

    const task = getByRole('listitem', {
      name: 'Fix bug in input error state',
    });
    const taskInput = within(task).getByRole('textbox');

    const updatedTaskName = 'Fix bug in the textarea error state';

    fireEvent.change(taskInput, {
      target: { value: 'Fix bug in the textarea error state' },
    });
    expect(taskInput.value).toBe(updatedTaskName);
  });

  it('should delete a task', async () => {
    const { queryByText, getByRole, getAllByRole } = render(<Default />);

    await waitFor(() => {
      expect(queryByText('You have no tasks')).not.toBeInTheDocument();
    });

    const getTask = () => getByRole('listitem', { name: 'Export logo' });

    const deleteButton = within(getTask()).getByRole('button', {
      name: 'delete',
    });

    fireEvent.click(deleteButton);

    expect(getAllByRole('listitem').length).toBe(5);
  });
});
