// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Express route handlers

app.get('/', (req, res) => {
  res.send('Greetings from the Server');
});

app.listen(5000, err => {
  console.log('Listening on Port 5000');
});
