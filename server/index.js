const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const functions = require('./functions.js');
// functions.getAccountIdByName('Anti213', 'na1');
// console.log(result);

async function testAsync() {
  let result = await functions.main('Anti213', 'na1');
  console.log(result);
}
// testAsync();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Express route handlers
app.get('/', async (req, res) => {
  let result = await functions.main('Anti213', 'na1');
  // console.log(typeof result);
  res.send(result);
});

app.listen(8080, err => {
  console.log('Listening on Port 8080');
});
