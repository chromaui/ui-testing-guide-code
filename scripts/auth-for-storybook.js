const fs = require('fs');

console.log('Fetch auth token');

fetch('/api/auth')
  .then((res) => res.json())
  .then((token) => {
    let data = JSON.stringify({ token });

    fs.writeFileSync('./src/mocks/auth.json', data);
  });
