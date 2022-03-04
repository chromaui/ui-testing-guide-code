import React from 'react';
import { rest } from 'msw';
import authData from './mocks/auth.json';

export default {
  component: 'TokenTest',
  title: 'TokenTest',
};

export const Default = () => {
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    fetch('/login')
      .then((res) => res.json())
      .then((data) => {
        setToken(data.token);
      });
  });

  return (
    <div style={{ padding: 32, backgroundColor: 'white' }}>
      <b>The token is:</b>{' '}
      <code
        style={{
          fontSize: '0.75em',
          padding: 6,
          backgroundColor: '#ddd',
          borderRadius: 3,
        }}
      >
        {token}
      </code>
    </div>
  );
};
Default.parameters = {
  msw: [
    rest.get('/login', (req, res, ctx) => {
      return res(ctx.json(authData));
    }),
  ],
};
