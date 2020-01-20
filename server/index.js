const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const functions = require('./functions.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Express route handlers
app.get('/', async (req, res) => {
  // console.log(req);
  let name = req.query.name;
  let region = req.query.region;
  // console.log(name, region);
  // console.log(typeof result);

  try {
    let result = await functions.mainV2(name, region);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }

  res.status(400).send(result);
});

app.listen(8080, err => {
  console.log('Listening on Port 8080');
});

// async function debugging() {
//   let result = await functions.main('Anti213', 'na1');
//   console.log(result);
// }

// debugging();
