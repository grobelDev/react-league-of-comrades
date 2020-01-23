import React, { useState, useEffect } from 'react';

const MatchHistory = props => {
  const [name, setName] = useState('');
  const [comrade, setComrade] = useState('');
  const [data, setData] = useState([]);
  const [matchHistory, setMatchHistory] = useState({});
  let queues = require('./queues.json');

  useEffect(() => {
    setName(props.name);
    setComrade(props.comrade);
    setData(props.data);
  }, [props]);

  useEffect(() => {
    getMatchOutcomes();
  }, [data]);

  function getMatchOutcomes() {
    if (!data) {
      return;
    }

    let comradeData = data.find(
      _comrade => _comrade.name.toLowerCase() === comrade.toLowerCase()
    );

    if (!comradeData) {
      return;
    }

    // process data
    let comradeMatchOutcomes = [];
    let matches = comradeData.matches;
    for (let i = 0; i < matches.length; i++) {
      let match = matches[i];
      console.log(match);

      //to-do
      let characterUsed;
      let kda;

      function isWin(match) {
        let participantIdentities = match.participantIdentities;
        let comradeIdentity = participantIdentities.find(
          participant =>
            participant.player.summonerName.toLowerCase() ===
            comrade.toLowerCase()
        );
        let comradeId = comradeIdentity.participantId;

        // determine victory or loss
        let winningNumbers = [];
        let teamBlueOutcome = match.teams[0].win;
        if (teamBlueOutcome === 'Win') {
          winningNumbers = [0, 1, 2, 3, 4];
        } else {
          winningNumbers = [5, 6, 7, 8, 9];
        }

        if (winningNumbers.includes(comradeId)) {
          return true;
        } else {
          return false;
        }
      }

      // gameDuration
      function gameDuration(match) {
        let totalSeconds = match.gameDuration;
        let gameMinutes = Math.floor(totalSeconds / 60);
        let gameSeconds = totalSeconds - gameMinutes * 60;

        gameDuration = `${gameMinutes}m ${gameSeconds}s`;
        return gameDuration;
      }

      // gameCreation
      function gameCreation(match) {
        let epochTime = match.gameCreation;
        gameCreation = new Date(epochTime);

        return gameCreation;
      }

      // queueObject
      function queueObject(match) {
        let queueId = match.queueId;
        queueObject = queues.find(queue => queue.queueId === queueId);
        return queueObject;
      }

      comradeMatchOutcomes.push({
        isWin: isWin(match),
        // isRemake: isRemake,
        gameCreation: gameCreation(match),
        queueObject: queueObject(match),
        gameDuration: gameDuration(match)
      });
    }

    console.log(comradeMatchOutcomes);
    setMatchHistory(comradeMatchOutcomes);

    // let comradeMatches = comradeData.matches;
    // let teamBlue = comradeMatches.teams[0];
    // let teamRed = comradeMatches.teams[1];

    console.log(matches);
    // console.log(specificMatches);
    // console.log(specificMatches);
    // console.log(comradeMatchOutcomes);
  }

  return (
    <div className='mt-20'>
      <MatchHistoryHeader name={name} comrade={comrade}></MatchHistoryHeader>
      <MatchHistoryDetails></MatchHistoryDetails>
      {/* <div>{name}</div> */}
      {/* <div>{comrade}</div> */}
      {/* <div>{JSON.stringify(data)}</div> */}
      <div>{JSON.stringify(matchHistory)}</div>
    </div>
  );
};

export default MatchHistory;

function MatchHistoryHeader({ name, comrade }) {
  return (
    <div>
      {/* MatchHistoryHeader */}
      <div className='flex justify-center'>
        <div className='p-4 border border-gray-600 rounded'>
          <div className='text-3xl font-light leading-tight sm:text-4xl md:text-5xl xl:text-4xl'>
            <div className='flex flex-col'>
              <span className='flex justify-center font-normal text-blue-500'>
                {name}
              </span>
              <span className='flex justify-center'>x</span>
              <span className='flex justify-center font-normal text-blue-500'>
                {comrade}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatchHistoryDetails() {
  return <div>MatchHistoryDetails</div>;
}
