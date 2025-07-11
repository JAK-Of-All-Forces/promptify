const express = require('express');
const app = express();
const PORT = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});