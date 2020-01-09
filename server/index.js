const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// app.use(cors());
app.use(bodyParser.json());

// Express route handlers
app.get('/', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(8080, err => {
  console.log('Listening on Port 8080');
});
