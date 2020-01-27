// const fs = require('fs');

// function dataToFile(data) {
//   let results = JSON.stringify(data);

//   fs.writeFile('data5.json', results, err => {
//     // In case of a error throw err.
//     if (err) throw err;
//   });
// }

// function resultsToFile(data) {
//   let results = JSON.stringify(data);

//   fs.writeFile('results.json', results, err => {
//     // In case of a error throw err.
//     if (err) throw err;
//   });
// }

// let sampleData = require('./data4.json');
let queues = require('./queues.json');
let ddragon = require('./ddragon.js');
// const fetch = require('node-fetch');

// async function dataFilter(data) {
//   // begin data fetching
//   // let currentPatch = await ddragon.getCurrentPatch();
//   // let getChampionJSON = await ddragon.getChampionJSON(currentPatch);
//   // // console.log(getChampionJSON);
//   // // console.log(data);
//   // console.log(data);
//   // let results = dataMain
//   // dataToFile(data);
//   // dataMain(sampleData);
// }

// console.log(JSON.stringify(dataMain(sampleData)));

// let results = dataMain(sampleData);
// console.log(results);
// console.log(JSON.stringify(results));

async function dataMain(data) {
  let currentPatch = data.currentPatch;
  let championJSON = await ddragon.getChampionJSON(currentPatch);
  // console.log(championJSON);
  let userName = data.userName;
  let playerData = data.playerData;

  let newPlayerData = playerData.map(player => {
    let matchData = player.matches.map(match => {
      return {
        Game: getGameDataFromMatch(match),
        User: getPlayerDataFromMatch(
          userName,
          match,
          championJSON,
          currentPatch
        ),
        Comrade: getPlayerDataFromMatch(
          player.name,
          match,
          championJSON,
          currentPatch
        )
      };
    });

    return {
      ...player,
      matches: matchData
    };
  });

  let results = {
    ...data,
    playerData: newPlayerData
  };
  // resultsToFile(results);
  return results;
}

function getGameDataFromMatch(match) {
  return {
    queueType: getQueueDataFromMatch(match),
    duration: getDurationFromMatch(match),
    creation: getCreationFromMatch(match)
  };

  function getQueueDataFromMatch(match) {
    let queueId = match.queueId;
    queueObject = queues.find(queue => queue.queueId === queueId);
    return queueObject;
  }

  function getDurationFromMatch(match) {
    let totalSeconds = match.gameDuration;
    let gameMinutes = Math.floor(totalSeconds / 60);
    let gameSeconds = totalSeconds - gameMinutes * 60;
    gameDuration = `${gameMinutes}m ${gameSeconds}s`;
    return gameDuration;
  }

  function getCreationFromMatch(match) {
    let epochTime = match.gameCreation;
    gameCreation = new Date(epochTime);
    return gameCreation;
  }
}

// Example names will be stxc and doublelift
function getPlayerDataFromMatch(name, match, championJSON, currentPatch) {
  // setup
  let participantIdentities = match.participantIdentities;
  let playerIdentity = participantIdentities.find(
    participant =>
      participant.player.summonerName.toLowerCase() === name.toLowerCase()
  );
  let playerId = playerIdentity.participantId;
  let playerIndex = playerId - 1;

  // this is where we get the other values from.
  let playerData = match.participants[playerIndex];
  let playerStats = playerData.stats;

  // Computed Values:
  let victory = playerStats.win;
  let championId = playerData.championId;
  let championName = ddragon.getChampionNameFromId(championJSON, championId);
  let championImage = ddragon.getChampionImageURLFromName(
    currentPatch,
    championName
  );
  let creepScore = playerStats.totalMinionsKilled;
  let goldEarned = playerStats.goldEarned;
  let kills = playerStats.kills;
  let deaths = playerStats.deaths;
  let assists = playerStats.assists;
  let item0 = ddragon.getItemImageURLFromId(currentPatch, playerStats.item0);
  let item1 = ddragon.getItemImageURLFromId(currentPatch, playerStats.item1);
  let item2 = ddragon.getItemImageURLFromId(currentPatch, playerStats.item2);
  let item3 = ddragon.getItemImageURLFromId(currentPatch, playerStats.item3);
  let item4 = ddragon.getItemImageURLFromId(currentPatch, playerStats.item4);
  let item5 = ddragon.getItemImageURLFromId(currentPatch, playerStats.item5);
  let item6 = ddragon.getItemImageURLFromId(currentPatch, playerStats.item6);

  return {
    victory,
    championId,
    championName,
    championImage,
    creepScore,
    goldEarned,
    kills,
    deaths,
    assists,
    item0,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6
  };
}

// getCurrentPatch: getCurrentPatch,
// getChampionJSON: getChampionJSON,
// getChampionNameFromId: getChampionNameFromId,
// getChampionImageURLFromName: getChampionImageURLFromName,
// getProfileImageURLFromId: getProfileImageURLFromId,
// getItemImageURLFromId: getItemImageURLFromId

// function replaceItem
// data fetching functions
// async function getCurrentPatchV2() {
//   let url = 'https://ddragon.leagueoflegends.com/api/versions.json';

//   try {
//     const response = await fetch(url);
//     if (response.ok) {
//       let patchList = await response.json();
//       return patchList[0];
//     }
//     throw new Error(response.statusText);
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// let images = {
//   item0,
//   item1,
//   item2,
//   item3,
//   item4,
//   item5,
//   item6
// };

// function getGameDurationFromRaw(rawGameDuration) {

// }

// function isWin(match) {
//   let participantIdentities = match.participantIdentities;
//   let comradeIdentity = participantIdentities.find(
//     participant =>
//       participant.player.summonerName.toLowerCase() ===
//       comrade.toLowerCase()
//   );
//   let comradeId = comradeIdentity.participantId;

//   // determine victory or loss
//   let winningNumbers = [];
//   let teamBlueOutcome = match.teams[0].win;
//   if (teamBlueOutcome === 'Win') {
//     winningNumbers = [0, 1, 2, 3, 4];
//   } else {
//     winningNumbers = [5, 6, 7, 8, 9];
//   }

//   if (winningNumbers.includes(comradeId)) {
//     return true;
//   } else {
//     return false;
//   }
// }

// // gameDuration
// function gameDuration(match) {
//   let totalSeconds = match.gameDuration;
//   let gameMinutes = Math.floor(totalSeconds / 60);
//   let gameSeconds = totalSeconds - gameMinutes * 60;

//   gameDuration = `${gameMinutes}m ${gameSeconds}s`;
//   return gameDuration;
// }

// // gameCreation
// function gameCreation(match) {
//   let epochTime = match.gameCreation;
//   gameCreation = new Date(epochTime);

//   return gameCreation;
// }

// // queueObject
// function queueObject(match) {
//   let queueId = match.queueId;
//   queueObject = queues.find(queue => queue.queueId === queueId);
//   return queueObject;
// }

// function matchParse

// let MatchData = {
//   Game: {
//     queue,
//     duration,
//     creation
//   },
//   User: {
//     victory,
//     championId,
//     creepScore,
//     goldEarned,
//     kills,
//     deaths,
//     assists,
//     item0,
//     item1,
//     item2,
//     item3,
//     item4,
//     item5,
//     item6
//   },
//   Comrade: {
//     victory,
//     championId,
//     creepScore,
//     goldEarned,
//     kills,
//     deaths,
//     assists,
//     item0,
//     item1,
//     item2,
//     item3,
//     item4,
//     item5,
//     item6
//   }
// };

module.exports = {
  // dataFilter: dataFilter,
  dataMain: dataMain
};
