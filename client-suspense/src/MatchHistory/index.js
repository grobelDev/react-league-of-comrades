import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
    <div className='mt-24'>
      <MatchHistoryHero name={name} comrade={comrade}></MatchHistoryHero>
      <MatchLayout matchHistory={matchHistory}>
        <div className='flex flex-col'>
          <MatchHistoryDetailsV2></MatchHistoryDetailsV2>
          <div className='p-2 text-xl'>Anti213</div>
          <div className='flex flex-col justify-center pl-3 text-xl text-gray-600'>
            x
          </div>
          <div className='p-2 text-xl'>KamikazeTomato</div>
          <MatchHistoryDetails></MatchHistoryDetails>
        </div>
      </MatchLayout>
    </div>
  );
};

export default MatchHistory;

function MatchHistoryHero({ name, comrade }) {
  return (
    <div>
      <div className='flex justify-center '>
        <div className='p-4 bg-white border border-gray-600 rounded'>
          <div className='text-3xl font-light leading-tight sm:text-4xl md:text-5xl xl:text-4xl'>
            <div className='flex flex-col '>
              <span className='flex justify-center font-normal text-gray-900'>
                {name}
              </span>
              <span className='flex justify-center text-gray-600'>x</span>
              <span className='flex justify-center font-normal text-gray-900'>
                {comrade}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatchLayout({ children }) {
  return (
    <div>
      <div className='relative w-full pt-16 pb-40 mx-auto bg-gray-200 max-w-screen-xl md:pb-24'>
        {/* <div className='flex justify-center text-2xl'>Match History</div> */}
        <div className='flex'>
          <div className='flex flex-col justify-center px-2'>Jan 22</div>
          <div className='flex-1 my-8 border-b-2 border-gray-500'></div>
        </div>
        <div className='overflow-hidden bg-white border-t border-b border-gray-400'>
          {children}
        </div>
      </div>
    </div>
  );
}

function MatchHistoryDetailsV2() {
  return (
    <div>
      <div className='relative overflow-hidden'>
        <MatchHistoryDetailsHeader></MatchHistoryDetailsHeader>

        <MatchDetails></MatchDetails>
        <MatchDetails></MatchDetails>
      </div>
    </div>
  );

  function MatchHistoryDetailsHeader() {
    return (
      <div className='flex items-center justify-between py-3 border-b border-gray-200'>
        <div className='flex flex-1 min-w-0 px-2 text-s'>Ranked Solo</div>
        <div className='flex items-center flex-shrink-0 px-2 ml-6 text-s'>
          28m 9s
        </div>
      </div>
    );
  }

  function MatchDetails() {
    return (
      <div>
        <div className='flex'>
          <div className='flex flex-col justify-center px-2 mt-2'>Anti213</div>
          <div className='flex-1 mt-6 mb-4 border-b-2 border-gray-500'></div>
          <div className='flex flex-col justify-center px-2 mt-2 font-bold tracking-wide text-blue-500'>
            VICTORY
          </div>
        </div>
        <div className='flex justify-between p-2 border-b border-gray-200'>
          {/* <div className='flex justify-center'> */}
          <div className='flex flex-col items-center justify-center mt-2 text-center big-picture'>
            <StyledAvatar>M</StyledAvatar>
            <div className='pt-4 text-sm'>Aurelion Sol</div>
          </div>
          <div className='flex justify-center'>
            <div className='flex flex-col items-center justify-between font-semibold text-center'>
              <div>3 / 4 / 3</div>
              <div>160</div>
              <div>11,121</div>
            </div>
          </div>
          <div className='flex justify-end '>
            <div className='flex flex-col justify-center'>
              <div className='flex justify-between'>
                <div className='flex flex-col'>
                  <CustomStyledAvatarSquare>R</CustomStyledAvatarSquare>
                  <CustomStyledAvatarSquare>R</CustomStyledAvatarSquare>
                </div>
                <div className='flex flex-col'>
                  <CustomStyledAvatarSquare>R</CustomStyledAvatarSquare>
                  <CustomStyledAvatarSquare>R</CustomStyledAvatarSquare>
                </div>
                <div className='flex flex-col'>
                  <CustomStyledAvatarSquare>R</CustomStyledAvatarSquare>
                  <CustomStyledAvatarSquare>R</CustomStyledAvatarSquare>
                </div>
                <div className='flex flex-col justify-center'>
                  <CustomStyledAvatarSquare>R</CustomStyledAvatarSquare>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function CustomStyledAvatarSquare({ children }) {
    return <StyledAvatarSquare className='m-1'>{children}</StyledAvatarSquare>;
  }
}

function MatchHistoryDetails() {
  return (
    <div>
      <div className='flex'>
        <div className='w-1/3 bg-red-400'>
          <MatchHistorySection1></MatchHistorySection1>
        </div>
        <div className='w-1/3 bg-green-400'>sdf</div>
        <div className='w-1/3 bg-teal-400'>Section 3</div>
        {/* <div className='w-1/3 py-2 bg-orange-400'>Section 4</div> */}
        {/* <div className='w-1/5 px-2 py-2 bg-indigo-400'>Section 5</div> */}
      </div>
    </div>
  );
}

function MatchHistorySection1() {
  return (
    <div className='flex'>
      <div className='flex flex-col items-center w-1/3 text-center'>
        <StyledAvatar className='p-2'>M</StyledAvatar>
        <div className='text-xs'>Mordekaiser</div>
      </div>
      <div className='w-2/3'>
        <div className='tracking-wide text-s'>VICTORY</div>
        <div className='text-xs'>Normal (Draft Pick)</div>
        <div className='flex'>
          <div>F</div>
          <div>T</div>
        </div>
      </div>
      {/* <div>
        <div>Normal</div>
        <div>---</div>
        <div>Victory</div>
      </div>
      <div>
        <div className='flex'>
          <StyledAvatar className='flex flex-col justify-center'>
            M
          </StyledAvatar>
          <div className='flex flex-col'>
            <div className=''>sd</div>
            <div className=''>sdf</div>
          </div>
        </div>
        <div>Mordekaiser</div>
      </div> */}
    </div>
  );
}

export const StyledAvatar = styled.div`
  background-color: #f3f3f3;
  height: 3rem;
  width: 3rem;
  border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  // margin-right: 1rem;
`;

export const StyledAvatarSquare = styled.div`
  background-color: #f3f3f3;
  height: 2.5rem;
  width: 2.5rem;
  // border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  // margin: 0.3rem;
  // ddonggumong: 5 inches, flat;
`;
