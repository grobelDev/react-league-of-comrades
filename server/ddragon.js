const fetch = require('node-fetch');

// 3.0: - ddragon api calls

// 3.1: - Returns current Patch from ddragon
// async function getCurrentPatch() {
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

// 3.2: - Returns current champion list from ddragon
async function getChampionJSON(currentPatch) {
  let url = `http://ddragon.leagueoflegends.com/cdn/${currentPatch}/data/en_US/champion.json`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      let championJSON = await response.json();
      return championJSON;
    }
  } catch (err) {
    throw new Error(err);
  }
}

// 3.4: - Returns ChampionName by ChampionId from ddragon
function getChampionNameFromId(championJSON, championId) {
  let data = championJSON.data;

  let championObject = {};
  for (let key in data) {
    championObject[data[key].key] = data[key].id;
  }

  let championName = championObject[championId];

  return championName;
}

// 3.5: - Returns Champion ImageLUrl by ChampionName from ddragon
function getChampionImageURLFromName(currentPatch, championName) {
  // Example URL: http://ddragon.leagueoflegends.com/cdn/9.3.1/img/champion/Ziggs.png
  let baseURL = `http://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/champion/${championName}.png`;

  return baseURL;
}

function getItemImageURLFromId(currentPatch, itemId) {
  // 3.6: - Returns Item ImageUrl by ItemId from ddragon
  if (itemId === 0) {
    return null;
  }

  // Example URL: http://ddragon.leagueoflegends.com/cdn/10.2.1/img/item/3139.png
  let baseURL = `http://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/item/${itemId}.png`;

  return baseURL;
}

module.exports = {
  // getCurrentPatch: getCurrentPatch,
  getChampionJSON: getChampionJSON,
  getChampionNameFromId: getChampionNameFromId,
  getChampionImageURLFromName: getChampionImageURLFromName,
  // getProfileImageURLFromId: getProfileImageURLFromId,
  getItemImageURLFromId: getItemImageURLFromId
};
