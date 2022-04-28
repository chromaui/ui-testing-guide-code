import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import { getWorker } from 'msw-storybook-addon';
import * as stories from './Dialog.stories';

describe('Dialog', () => {
  afterEach(() => {
    cleanup();
  });

  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests
  afterAll(() => getWorker().close());

  const { Default, AuthFailed, DeleteFailed, DeleteSuccess } =
    composeStories(stories);

  it('Should open confirm dialog', async () => {
    const { findByText } = render(<Default />);

    const button = await findByText('Delete Customer');
    await fireEvent.click(button);

    const confirmMessage = await screen.findByText(/Are you sure?/);
    await expect(confirmMessage).toBeInTheDocument();
  });

  it('Should show error if unable to fetch user info', async () => {
    const { findByText } = render(<AuthFailed />);

    const button = await findByText('Delete Customer');
    await fireEvent.click(button);

    expect(await findByText(/Not authenticated/)).toBeInTheDocument();
  });

  it('Should show error if delete failed', async () => {
    const { findByText } = render(<DeleteFailed />);

    const button = await findByText('Delete Customer');
    await fireEvent.click(button);

    const confirmButton = await findByText('Confirm');
    await fireEvent.click(confirmButton);

    expect(await findByText(/Something went wrong/)).toBeInTheDocument();
  });

  it('Should delete customer', async () => {
    const { findByText } = render(<DeleteSuccess />);

    const button = await findByText('Delete Customer');
    await fireEvent.click(button);

    const confirmButton = await findByText('Confirm');
    await fireEvent.click(confirmButton);

    expect(
      await findByText(/Customer 7238947029 deleted!/)
    ).toBeInTheDocument();
  });
});
