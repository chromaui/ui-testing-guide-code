const fs = require('fs');

console.log('Fetch auth token');

// fetch('/api/auth')
//   .then((res) => res.json())
Promise.resolve('SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c').then((token) => {
  let data = JSON.stringify({ token });

  fs.writeFileSync('./src/mocks/auth.json', data);
});
