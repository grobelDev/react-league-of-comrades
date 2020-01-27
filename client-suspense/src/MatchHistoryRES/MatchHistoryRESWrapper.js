import React, { useState, useEffect, Suspense, Fragment } from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';

import FadeIn from 'react-fade-in';
import MatchHistoryRES from '../MatchHistoryRES';
import Spinner from '../Spinner';

export default function MatchHistoryRESWrapper({ resource }) {
  return (
    <div>
      <Suspense
        fallback={
          <FadeIn>
            <Spinner></Spinner>
          </FadeIn>
        }
      >
        <MatchHistoryRESDetails resource={resource}></MatchHistoryRESDetails>
      </Suspense>
    </div>
  );
}

function MatchHistoryRESDetails({ resource }) {
  // setup
  let { comrade } = useParams();
  let data = resource.results.read();
  let playerData = data.playerData;
  let comradeData = getComradeData(comrade, playerData);

  // desired values
  let name = data.userName;
  let profileImage = comradeData.profileImage;
  let count = comradeData.count;
  let matches = comradeData.matches;

  // console.log(comrade);
  return (
    <div>
      <MatchHistoryRES
        name={name}
        comrade={comrade}
        profileImage={profileImage}
        count={count}
        matches={matches}
      ></MatchHistoryRES>
    </div>
  );
}

function getComradeData(comrade, playerData) {
  let comradeData = playerData.find(player => player.name === comrade);
  return comradeData;
}

// import React, { useState, useTransition, Suspense, useEffect } from 'react';
// import { BrowserRouter as Router, useParams } from 'react-router-dom';

// import MatchHistory from './MatchHistory';
// import FadeIn from 'react-fade-in';
// import Spinner from './Spinner';

// let queues = require('./MatchHistory/queues.json');

// export default function MatchHistoryWrapper({ resource }) {
//   return (
//     <Suspense
//       fallback={
//         <FadeIn>
//           <Spinner></Spinner>
//         </FadeIn>
//       }
//     >
//       <MatchHistoryDetails resource={resource}></MatchHistoryDetails>
//     </Suspense>
//   );
// }

// function MatchHistoryDetails({ resource }) {
//   let { comrade } = useParams();
//   const name = resource.userName;
//   const data = resource.comrades.read();
//   let formattedName = parseData(name, data).formattedName;
//   let matchHistory = getMatchOutcomes(name, comrade, data);

//   return (
//     <FadeIn>
//       <MatchHistory
//         name={formattedName}
//         comrade={comrade}
//         matchHistory={matchHistory}
//       ></MatchHistory>
//     </FadeIn>
//   );
// }

// function getMatchOutcomes(name, comrade, data) {
//   if (!data) {
//     return;
//   }

//   let comradeData = data.find(
//     _comrade => _comrade.name.toLowerCase() === comrade.toLowerCase()
//   );

//   if (!comradeData) {
//     return;
//   }

//   // process data
//   let comradeMatchOutcomes = [];
//   let matches = comradeData.matches;
//   for (let i = 0; i < matches.length; i++) {
//     let match = matches[i];
//     // console.log(match);

//     //to-do
//     // let characterUsed;
//     // let kda;

//     function getUserMatch() {
//       console.log('MATCH DATA', match);
//     }

//     getUserMatch();

//     function isWin(match) {
//       let participantIdentities = match.participantIdentities;
//       let comradeIdentity = participantIdentities.find(
//         participant =>
//           participant.player.summonerName.toLowerCase() ===
//           comrade.toLowerCase()
//       );
//       let comradeId = comradeIdentity.participantId;

//       // determine victory or loss
//       let winningNumbers = [];
//       let teamBlueOutcome = match.teams[0].win;
//       if (teamBlueOutcome === 'Win') {
//         winningNumbers = [0, 1, 2, 3, 4];
//       } else {
//         winningNumbers = [5, 6, 7, 8, 9];
//       }

//       if (winningNumbers.includes(comradeId)) {
//         return true;
//       } else {
//         return false;
//       }
//     }

//     // gameDuration
//     function gameDuration(match) {
//       let totalSeconds = match.gameDuration;
//       let gameMinutes = Math.floor(totalSeconds / 60);
//       let gameSeconds = totalSeconds - gameMinutes * 60;

//       gameDuration = `${gameMinutes}m ${gameSeconds}s`;
//       return gameDuration;
//     }

//     // gameCreation
//     function gameCreation(match) {
//       let epochTime = match.gameCreation;
//       gameCreation = new Date(epochTime);

//       return gameCreation;
//     }

//     // queueObject
//     function queueObject(match) {
//       let queueId = match.queueId;
//       queueObject = queues.find(queue => queue.queueId === queueId);
//       return queueObject;
//     }

//     comradeMatchOutcomes.push({
//       isWin: isWin(match),
//       // isRemake: isRemake,
//       gameCreation: gameCreation(match),
//       queueObject: queueObject(match),
//       gameDuration: gameDuration(match)
//     });
//   }

//   return comradeMatchOutcomes;
// }

// function parseData(name, data) {
//   let formattedName = data.find(
//     player => player.name.toLowerCase() === name.toLowerCase()
//   ).name;

//   let filteredData = data.filter(player => player.name !== formattedName);

//   let newData = filteredData.map((player, index) => {
//     let message = `Played together ${player.count} times.`;
//     let avatar = player.name[0];
//     let id = index + 1;
//     let playerObject = {
//       title: player.name,
//       message: message,
//       avatar: avatar,
//       id: id
//     };
//     return playerObject;
//   });

//   let emailIds = [...new Array(newData.length).keys()];
//   let emails = newData;

//   // update name formatting
//   return { formattedName, emails, emailIds };
// }
