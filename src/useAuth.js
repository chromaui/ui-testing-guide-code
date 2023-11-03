import { useReducer } from 'react';

function authenticate(options) {
  return fetch('/authenticate', {
    method: 'POST',
    ...options,
  }).then((res) => res.json());
}

const reducer = (user, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.user;
    case 'LOG_OUT':
      return null;
    default:
      return user;
  }
};

export function useAuth() {
  const [user, dispatch] = useReducer(reducer, null);

  const logIn = ({ username, password }) => {
    authenticate(username, password)
      .then(({ user }) => {
        dispatch({ type: 'LOG_IN', user });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return [user, logIn];
}
