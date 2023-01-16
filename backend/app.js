const express = require('express');

const app = express();

app.use(express.json());
app.get('/users', () => console.log('getting'))

app.use((error, _req, res, _next) => {
  if (error.status) return res.status(error.status).json({ message: error.message });
  return res.status(500).json({ message: error.message });
});

module.exports = app;