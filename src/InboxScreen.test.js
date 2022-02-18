import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor, cleanup } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { composeStories } from '@storybook/testing-react';
import { getWorker } from 'msw-storybook-addon';
import * as stories from './InboxScreen.stories';

expect.extend(toHaveNoViolations);

describe('InboxScreen', () => {
  afterEach(() => {
    cleanup();
  });

  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests
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
});
