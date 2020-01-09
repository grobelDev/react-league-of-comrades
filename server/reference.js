'use strict';

// NOTE: - Organization of code is based on SEQUENCE (order in which they are called).
//           - ...Except for the results page.

// Track how many total API calls were used.
let apiCalls = 0;

async function main(summonerName, region) {
  // User Input
  // let region = 'na1';
  // let summonerName = 'anti213';
  $('#loading').removeClass('hidden');

  // Pre-requisites
  let gameCount = 10;

  let accountId = await getAccountIdByNameV2(summonerName, region);
  let matchlist = await getMatchlistByAccountIdV2(accountId, region);
  let smallMatchListIds = matchlist
    .slice(0, gameCount)
    .map(match => match.gameId);
  let matchIdArray = await getMatchIdsByMatchlist(smallMatchListIds, region);
  let summonerArray = getFinalSummonerArray(matchIdArray);
  let finalSummonerArray = summonerArray.filter(
    summoner => summoner.name.toLowerCase() !== summonerName.toLowerCase()
  );
  let currentPatch = await getCurrentPatchV2();
  finalSummonerArray.forEach(summoner => {
    summoner.profileIconSrc = getProfileIconImageURL(
      currentPatch,
      summoner.profileIcon
    );
  });

  // From Static Data
  // let championJSON = await getChampionListFromIdV2(currentPatch);

  // Display
  displayGameCount(gameCount);
  displayResultsV2(finalSummonerArray);

  // DEBUG: - console.logs
  // console.log(finalSummonerArray[0].profileIcon);
  // console.log(getProfileIconImageURL(currentPatch, finalSummonerArray[1].profileIcon));
  // console.log(finalSummonerArray);
  // console.log(`Total API Calls: ${apiCalls}`);
}

// 1.0: - INITIAL API CALLS

// 1.1: - Get AccountId using SummonerName (intial input)
async function getAccountIdByNameV2(summonerName, region) {
  // Example URL: https://eb2m2dnhs9.execute-api.us-west-1.amazonaws.com/rgapi/summoner/{region}/{id}
  let baseURL =
    'https://eb2m2dnhs9.execute-api.us-west-1.amazonaws.com/rgapi/summoner';

  const url = `${baseURL}/${region}/${summonerName}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      apiCalls++;
      const response2 = await response.json();
      return response2.accountId;
    }
    throw new Error(response.statusText);
  } catch (err) {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  }
}

// 1.2: - Get Matchlist using AccountId (from 1.1)
async function getMatchlistByAccountIdV2(accountId, region) {
  // Example URL: https://dd19nlv6ii.execute-api.us-west-1.amazonaws.com/rgpai-2/match/{region}/{id}
  let baseURL =
    'https://dd19nlv6ii.execute-api.us-west-1.amazonaws.com/rgpai-2/match';

  const url = `${baseURL}/${region}/${accountId}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      apiCalls++;
      let matchObject = await response.json();
      return matchObject.matches;
    }
    throw new Error(response.statusText);
    // const responseJson = undefined;
    // return await Promise.resolve(responseJson);
  } catch (err) {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  }
}

// 1.2.1: - Get MatchIds by converting Matchlist (from 1.1)
async function getMatchIdsByMatchlist(matchListIds, region) {
  let matchInfoArray = [];
  for (const matchId of matchListIds) {
    matchInfoArray.push(await getMatchInfoByMatchIdV2(matchId, region));
  }
  return matchInfoArray;
}

// 1.3: - Get MatchInfo from MatchIds (from 1.2.1)
async function getMatchInfoByMatchIdV2(matchId, region) {
  // Example URL: https://4m0karfe4g.execute-api.us-west-1.amazonaws.com/rgpai-3/match/{region}/{id}
  let baseURL =
    'https://4m0karfe4g.execute-api.us-west-1.amazonaws.com/rgpai-3/match';

  const url = `${baseURL}/${region}/${matchId}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      apiCalls++;
      let players = await response.json();
      return players;
    }
    throw new Error(response.statusText);
  } catch (err) {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  }
}

// 2.0: - PROCESS DATA

// 2.1: - Get SummonerData from MatchInfo
function getSummonerFromMatchInfo(matchInfo) {
  let participantIdentities = matchInfo.participantIdentities;
  let SummonerNames = participantIdentities.map(playerObj => {
    return {
      name: playerObj.player.summonerName,
      profileIcon: playerObj.player.profileIcon
    };
  });
  return SummonerNames;
}

// 2.2: - Returns the final array of objects of type Summoner (from 2.1)
function getFinalSummonerArray(matchInfoArray) {
  let summoners = [];
  matchInfoArray.forEach(matchInfo => {
    summoners.push(getSummonerFromMatchInfo(matchInfo));
  });

  let summonerResults = [];

  summoners.forEach(summonerArray => {
    summonerArray.forEach(summonerObject => {
      let findSummonerFromResults = summonerResults.find(
        element => element.name === summonerObject.name
      );

      if (findSummonerFromResults === undefined) {
        summonerObject.frequency = 1;
        summonerResults.push(summonerObject);
      } else {
        findSummonerFromResults.frequency += 1;
      }
    });
  });

  summonerResults.sort(function(a, b) {
    return b.frequency - a.frequency;
  });

  return summonerResults;
}

// 3.0: - OTHER API CALLS

// 3.1: - Returns current Patch from ddragon
async function getCurrentPatchV2() {
  let url = 'https://ddragon.leagueoflegends.com/api/versions.json';

  try {
    const response = await fetch(url);
    if (response.ok) {
      let patchList = await response.json();
      return patchList[0];
    }
    throw new Error(response.statusText);
  } catch (err) {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  }
}

// 3.2: - Returns current champion list from ddragon
async function getChampionListFromIdV2(currentPatch) {
  let url = `http://ddragon.leagueoflegends.com/cdn/${currentPatch}/data/en_US/champion.json`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      let championJSON = await response.json();
      return championJSON;
    }
  } catch (err) {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  }
}

// 3.3: - Returns ProfileIconImageUrl by profileIcon from ddragon
function getProfileIconImageURL(currentPatch, profileIcon) {
  let baseURL = `http://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/profileicon/${profileIcon}.png`;
  return baseURL;
}

// 3.4: - Returns ChampionName by ChampionId from ddragon
function parseChampionJSONV2(championJSON, championId) {
  // console.log(championJSON);
  let champions = championJSON.data;

  let championName = Object.keys(champions).find(function(champion) {
    return champions[champion].key == championId;
  });

  return championName;
}

// 3.5: - Returns ChampionImageUrl by ChampionName from ddragon
function getChampionImageURLV2(currentPatch, championName) {
  // Example URL: http://ddragon.leagueoflegends.com/cdn/9.3.1/img/champion/Ziggs.png
  let baseURL = `http://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/champion/${championName}.png`;

  return baseURL;
}

// 4.0: - DISPLAY SECTION

// 4.1: - Returns how many games the website is drawing from
function generateGameCount(gameCount) {
  return `
        <p>Displaying results from the last ${gameCount} games.</p>
    `;
}
function displayGameCount(gameCount) {
  $('#gameCount').empty();
  let results = generateGameCount(gameCount);

  $('#loading').addClass('hidden');

  $('#gameCount').html(results);
  $('#gameCount').removeClass('hidden');
}

// 4.2: - Returns the li's used to generate the final results page.
function generateResultsV2(summoner) {
  return `
        <li class='summoner-li'>
            <div class='li-frequency'> 
                <p>Times Played</p>
                <h1>${summoner.frequency}<h1>
            </div>
            <div class='li-summonerIcon'>
                <img class='img-summonerIcon' src=${summoner.profileIconSrc}></img>
            </div>
            <div class='li-summonerName'>
                <p>${summoner.name}</p>
            </div>
        </li>
    `;
}

function generateResultsStringV2(finalSummonerArray) {
  let results = finalSummonerArray.map(summoner => generateResultsV2(summoner));
  return results.join('');
  // let results = matchArray.map(match => generateResults(match));
  // return results.join('');
}

function displayResultsV2(finalSummonerArray) {
  // Remove previous input
  $('#results-list').empty();

  // Set the output
  let results = generateResultsStringV2(finalSummonerArray);
  $('#results').html(results);
  $('#results').removeClass('hidden');
}

// Z: - Handlers and things
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();

    const summonerName = $('#js-search-term').val();
    // const maxResults = $('#js-max-results').val();
    // getSummonerIdByName(searchTerm, "na1");
    main(summonerName, 'na1');
  });
}

$(watchForm);
