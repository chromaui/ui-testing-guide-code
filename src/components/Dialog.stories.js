import React from 'react';
import { Dialog } from './Dialog';
import { createClient, Provider } from 'urql';
import { rest, graphql } from 'msw';
import {
  within,
  fireEvent,
  screen,
  findByText,
} from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  component: Dialog,
  title: 'Dialog',
  // Add a container to account for portal that renders the dialog
  decorators: [
    (storyFn) => <div style={{ width: '100%', height: 400 }}>{storyFn()}</div>,
  ],
  args: {
    customerId: '7238947029',
  },
  parameters: {
    backgrounds: { default: 'white' },
  },
};

/**
 * Shared mocks and interactions
 */
const mockedClient = createClient({
  url: 'https://example.com/api',
  requestPolicy: 'network-only',
});

const Template = (args) => (
  <Provider value={mockedClient}>
    <Dialog {...args} />
  </Provider>
);

const openDialog = async (canvasElement) => {
  const canvas = within(canvasElement);
  const button = await canvas.findByText('Delete Customer');
  await fireEvent.click(button);
};

const mockGetUserInfo = graphql.query('GetUserInfo', (req, res, ctx) => {
  return res(
    ctx.data({
      user: {
        isAuthorized: true,
      },
    })
  );
});
const mockDeleteCustomer = rest.delete(
  '/customers/:customerId',
  (req, res, ctx) => {
    const { customerId } = req.params;
    return res(ctx.json(`Customer ${customerId} deleted!`));
  }
);

/**
 * Test Cases
 */
export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [mockGetUserInfo, mockDeleteCustomer],
  },
};

export const Waiting = Template.bind({});
Waiting.play = async ({ canvasElement }) => {
  await openDialog(canvasElement);

  const spinner = await screen.findByText('Loading...');
  await expect(spinner).toBeInTheDocument();
};
Waiting.parameters = {
  msw: {
    handlers: [
      graphql.query('GetUserInfo', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.data({
            user: {
              isAuthorized: true,
            },
          })
        );
      }),
    ],
  },
};

export const FailedAuth = Template.bind({});
FailedAuth.play = async ({ canvasElement }) => {
  await openDialog(canvasElement);

  const errorMessage = await screen.findByText(/Not authenticated/);
  await expect(errorMessage).toBeInTheDocument();
};
FailedAuth.parameters = {
  msw: {
    handlers: [
      graphql.query('GetUserInfo', (req, res, ctx) => {
        return res(
          ctx.errors([
            {
              message: 'Not authenticated',
              errorType: 'AuthenticationError',
            },
          ])
        );
      }),
    ],
  },
};

export const IsNotAuthorized = Template.bind({});
IsNotAuthorized.play = async ({ canvasElement }) => {
  await openDialog(canvasElement);
  const notAuthorizedMessage = await screen.findByText(
    "You don't have permission to delete this customer."
  );
  await expect(notAuthorizedMessage).toBeInTheDocument();
};
IsNotAuthorized.parameters = {
  msw: {
    handlers: [
      graphql.query('GetUserInfo', (req, res, ctx) => {
        return res(
          ctx.data({
            user: {
              isAuthorized: false,
            },
          })
        );
      }),
    ],
  },
};

export const IsAuthorized = Template.bind({});
IsAuthorized.play = async ({ canvasElement }) => {
  await openDialog(canvasElement);

  const confirmMessage = await screen.findByText(/Are you sure?/);
  await expect(confirmMessage).toBeInTheDocument();
};
IsAuthorized.parameters = {
  msw: {
    handlers: [mockGetUserInfo],
  },
};

export const DeleteFailed = Template.bind({});
DeleteFailed.play = async ({ canvasElement }) => {
  await IsAuthorized.play({ canvasElement });
  const confirmButton = await screen.findByText('Confirm');
  await fireEvent.click(confirmButton);
  expect(
    await findByText(canvasElement, /Something went wrong/)
  ).toBeInTheDocument();
};
DeleteFailed.parameters = {
  msw: {
    handlers: [
      mockGetUserInfo,
      rest.delete('/customers/:customerId', (req, res, ctx) => {
        return res(
          ctx.status(403),
          ctx.json({
            errorMessage: 'Not authorized',
          })
        );
      }),
    ],
  },
};

export const DeleteSuccess = Template.bind({});
DeleteSuccess.play = async ({ canvasElement }) => {
  await IsAuthorized.play({ canvasElement });
  const confirmButton = await screen.findByText('Confirm');
  await fireEvent.click(confirmButton);

  expect(
    await findByText(canvasElement, /Customer 7238947029 deleted!/)
  ).toBeInTheDocument();
};
DeleteSuccess.parameters = {
  msw: {
    handlers: [mockGetUserInfo, mockDeleteCustomer],
  },
};
