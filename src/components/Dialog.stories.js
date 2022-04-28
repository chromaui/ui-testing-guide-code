import React from 'react';
import { Dialog } from './Dialog';
import { createClient, Provider } from 'urql';
import { rest, graphql } from 'msw';

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
};

const mockedClient = createClient({
  url: 'https://example.com/api',
  requestPolicy: 'network-only',
});

const Template = (args) => (
  <Provider value={mockedClient}>
    <Dialog {...args} />
  </Provider>
);

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

export const Default = Template.bind({});
Default.parameters = {
  msw: {
    handlers: [mockGetUserInfo, mockDeleteCustomer],
  },
};

export const AuthFailed = Template.bind({});
AuthFailed.parameters = {
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

export const DeleteFailed = Template.bind({});
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
DeleteSuccess.parameters = {
  msw: {
    handlers: [mockGetUserInfo, mockDeleteCustomer],
  },
};
