require('dotenv').config();

const fetch = require('node-fetch');

let apiCalls = 0;

// async function mainV2(summonerName, region) {
//   try {
//     let gameCount = 1;

//     let accountId = await getAccountIdByNameV2(summonerName, region);
//     let matchlist = await getMatchlistByAccountIdV2(accountId, region);
//     let smallMatchListIds = matchlist
//       .slice(0, gameCount)
//       .map(match => match.gameId);
//     let matchIdArray = await getMatchIdsByMatchlist(smallMatchListIds, region);

//     let summonerArray = organizePlayerObject(matchIdArray);

//     return summonerArray;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

async function mainV3(summonerName, region) {
  try {
    let gameCount = 1;

    let playerData = await getAccountIdByNameV3(summonerName, region);
    let accountId = playerData.accountId;
    let profileIcon = playerData.profileIcon;

    let matchlist = await getMatchlistByAccountIdV2(accountId, region);
    let smallMatchListIds = matchlist
      .slice(0, gameCount)
      .map(match => match.gameId);
    let matchIdArray = await getMatchIdsByMatchlist(smallMatchListIds, region);
    let currentPatch = await getCurrentPatch();

    let summonerArray = organizePlayerObject(currentPatch, matchIdArray);

    let trueSummonerName = summonerArray.find(
      summoner => summoner.name.toLowerCase() === summonerName.toLowerCase()
    ).name;
    let filteredSummonerArray = summonerArray.filter(
      summoner => summoner.name !== trueSummonerName
    );

    let profileImage = getProfileImageURLFromId(currentPatch, profileIcon);

    let results = {
      userName: trueSummonerName,
      profileImage: profileImage,
      gameCount: gameCount,
      currentPatch: currentPatch,
      playerData: filteredSummonerArray
    };

    return results;
  } catch (err) {
    throw new Error(err);
  }
}

// 1.0: - INITIAL API CALLS

// 1.1: - Get AccountId using SummonerName (intial input)
// async function getAccountIdByNameV2(summonerName, region) {
//   // Example URL: https://eb2m2dnhs9.execute-api.us-west-1.amazonaws.com/rgapi/summoner/{region}/{id}
//   let baseURL =
//     'https://eb2m2dnhs9.execute-api.us-west-1.amazonaws.com/rgapi/summoner';

//   const url = `${baseURL}/${region}/${summonerName}`;

//   try {
//     const response = await fetch(url);
//     if (response.ok) {
//       apiCalls++;
//       const response2 = await response.json();
//       // console.log(response2);
//       // console.log(response2.profileIconId);
//       return response2.accountId;
//     }
//     throw new Error(response.statusText);
//   } catch (err) {
//     throw new Error(err);
//   }
// }

async function getAccountIdByNameV3(summonerName, region) {
  // Example URL: https://eb2m2dnhs9.execute-api.us-west-1.amazonaws.com/rgapi/summoner/{region}/{id}
  let baseURL =
    'https://eb2m2dnhs9.execute-api.us-west-1.amazonaws.com/rgapi/summoner';

  const url = `${baseURL}/${region}/${summonerName}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      apiCalls++;
      const response2 = await response.json();
      // console.log(response2);
      // console.log(response2.profileIconId);
      // console.log(response2);
      return {
        accountId: response2.accountId,
        profileIcon: response2.profileIconId
      };
    }
    throw new Error(response.statusText);
  } catch (err) {
    throw new Error(err);
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
    throw new Error(err);
    // $('#js-error-message').text(`Something went wrong: ${err.message}`);
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
    throw new Error(err);
  }
}

// 2.0: - PROCESS DATA

// 2.1: - Get SummonerData from MatchInfo
// function getSummonerFromMatchInfo(matchInfo) {
//   let participantIdentities = matchInfo.participantIdentities;
//   let SummonerNames = participantIdentities.map(playerObj => {
//     return {
//       name: playerObj.player.summonerName,
//       profileIcon: playerObj.player.profileIcon
//     };
//   });
//   return SummonerNames;
// }

// 2.2: - Returns the final array of objects of type Summoner (from 2.1)
// function getFinalSummonerArray(matchInfoArray) {
//   let summoners = [];
//   matchInfoArray.forEach(matchInfo => {
//     summoners.push(getSummonerFromMatchInfo(matchInfo));
//   });

//   let summonerResults = [];

//   summoners.forEach(summonerArray => {
//     summonerArray.forEach(summonerObject => {
//       let findSummonerFromResults = summonerResults.find(
//         element => element.name === summonerObject.name
//       );

//       if (findSummonerFromResults === undefined) {
//         summonerObject.frequency = 1;
//         summonerResults.push(summonerObject);
//       } else {
//         findSummonerFromResults.frequency += 1;
//       }
//     });
//   });

//   summonerResults.sort(function(a, b) {
//     return b.frequency - a.frequency;
//   });

//   return summonerResults;
// }

// 3.1: - Returns current Patch from ddragon
async function getCurrentPatch() {
  let url = 'https://ddragon.leagueoflegends.com/api/versions.json';

  try {
    const response = await fetch(url);
    if (response.ok) {
      let patchList = await response.json();
      return patchList[0];
    }
    throw new Error(response.statusText);
  } catch (err) {
    throw new Error(err);
  }
}

// 3.3: - Returns ProfileIconImageUrl by profileIcon from ddragon
function getProfileImageURLFromId(currentPatch, profileIcon) {
  // Example URL: http://ddragon.leagueoflegends.com/cdn/10.2.1/img/profileicon/3270.png

  let baseURL = `http://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/profileicon/${profileIcon}.png`;
  return baseURL;
}

// 3.6 - Returns final Player Object from the matchIdArray
function organizePlayerObject(currentPatch, matchIdArray) {
  // Get every match with our Summoner.
  let result = [];

  for (let i = 0; i < matchIdArray.length; i++) {
    let match = matchIdArray[i];
    let participants = match.participantIdentities;

    for (let j = 0; j < participants.length; j++) {
      let participant = participants[j];
      let summonerName = participant.player.summonerName;
      let profileIcon = participant.player.profileIcon;
      let profileImage = getProfileImageURLFromId(currentPatch, profileIcon);

      // Check if summoner is already in result...
      let summonerIndex = result.findIndex(
        summoner => summoner.name === summonerName
      );

      if (summonerIndex === -1) {
        let matches = [];
        matches.push(match);

        result.push({
          name: summonerName,
          profileImage: profileImage,
          count: 1,
          matches: matches
        });
      } else {
        result[summonerIndex].count++;
        result[summonerIndex].matches.push(match);
      }
    }
  }

  // Sort by Descending Order
  result.sort(function(a, b) {
    return b.count - a.count;
  });
  return result;
}

// Module Exports
module.exports = {
  // mainV2: mainV2,
  mainV3: mainV3
  // getAccountIdByName: getAccountIdByNameV2
};
