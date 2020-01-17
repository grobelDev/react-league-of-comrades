import React, { useState, useEffect } from 'react';

const MatchHistory = props => {
  const [name, setName] = useState('');
  const [comrade, setComrade] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    setName(props.name);
    setComrade(props.comrade);
    setData(props.data);
  }, [props]);

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

    let comradeMatchOutcomes = [];

    let matches = comradeData.matches;
    for (let i = 0; i < matches.length; i++) {
      let match = matches[i];

      let participantIdentities = match.participantIdentities;
      let comradeIdentity = participantIdentities.find(
        participant =>
          participant.player.summonerName.toLowerCase() ===
          comrade.toLowerCase()
      );

      // console.log(comradeTeam);
      // let comradeTeam = participantIdentities;
      // console.log(participantIdentities);

      let teamBlueOutcome = match.teams[0].win;
      if (teamBlueOutcome === 'Win') {
      }
    }

    // let comradeMatches = comradeData.matches;
    // let teamBlue = comradeMatches.teams[0];
    // let teamRed = comradeMatches.teams[1];

    console.log(matches);
    // console.log(specificMatches);
    // console.log(specificMatches);
  }

  getMatchOutcomes();
  return (
    <div>
      <div>{name}</div>
      <div>{comrade}</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default MatchHistory;
