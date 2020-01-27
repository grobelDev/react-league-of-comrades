const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const functions = require('./functions.js');
const functions2 = require('./functions2.js');

const app = express();

var corsOptions = {
  origin: 'https://leagueofcomrades.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Express route handlers
app.get('/', async (req, res) => {
  // console.log(req);
  let name = req.query.name;
  let region = req.query.region;
  // console.log(name, region);
  // console.log(typeof result);
  // console.log(decodeURIComponent(summonerName));

  try {
    // let result = await functions.mainV2(name, region);
    // let parsedData = await DataParse.dataFilter(result);
    // console.log(parsedData);
    // console.log('hi');
    let rawResult = await functions.mainV3(name, region);
    // let parsedData = await functions2.dataFilter(testResult);
    // let completeResult = rawResult;
    let completeResult = await functions2.dataMain(rawResult);

    res.status(200).send(completeResult);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.listen(8080, err => {
  console.log('Listening on Port 8080');
});

// async function debugging() {
//   let result = await functions.main('Anti213', 'na1');
//   console.log(result);
// }

// debugging();
// d
