const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const functions = require('./functions.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Express route handlers
app.get('/', async (req, res) => {
  let result = await functions.main('Doublelift', 'na1');
  // console.log(typeof result);
  res.send(result);
});

app.listen(8080, err => {
  console.log('Listening on Port 8080');
});
