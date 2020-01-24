import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MatchHistory = props => {
  const [name, setName] = useState('');
  const [comrade, setComrade] = useState('');
  const [data, setData] = useState([]);
  const [matchHistory, setMatchHistory] = useState(null);
  let queues = require('./queues.json');

  useEffect(() => {
    setName(props.name);
    setComrade(props.comrade);
    setMatchHistory(props.matchHistory);
    // setData(props.data);
  }, [props]);

  // useEffect(() => {
  //   getMatchOutcomes();
  // }, [data]);

  // function getMatchOutcomes() {
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
  //     console.log(match);

  //     //to-do
  //     let characterUsed;
  //     let kda;

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

  //   // console.log(comradeMatchOutcomes);
  //   setMatchHistory(comradeMatchOutcomes);

  //   // let comradeMatches = comradeData.matches;
  //   // let teamBlue = comradeMatches.teams[0];
  //   // let teamRed = comradeMatches.teams[1];

  //   // console.log(matches);
  //   // console.log(specificMatches);
  //   // console.log(specificMatches);
  //   // console.log(comradeMatchOutcomes);
  // }

  // console.log('rendering...', matchHistory);

  return (
    <div>
      {matchHistory ? (
        <div>
          <div className='mt-24'>
            <MatchHistoryHero name={name} comrade={comrade}></MatchHistoryHero>
            {/* <MatchLayout matchHistory={matchHistory}>
          <div className='flex flex-col'>
            <MatchWrapper></MatchWrapper>
          </div>
        </MatchLayout> */}
            <SingleMatchDetailsMain
              name={name}
              comrade={comrade}
              matchHistory={matchHistory}
            ></SingleMatchDetailsMain>
          </div>
          <div>
            <MatchLayout matchHistory={matchHistory}>
              <div className='flex flex-col'>
                <MatchWrapper></MatchWrapper>
              </div>
            </MatchLayout>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MatchHistory;

function MatchHistoryHero({ name, comrade }) {
  return (
    <div>
      <div className='flex justify-center'>
        <div className='flex justify-center w-3/4 p-4 bg-white border border-gray-600 rounded'>
          <div className='text-3xl font-light leading-tight sm:text-4xl md:text-5xl xl:text-4xl'>
            <div className='flex flex-col'>
              <span className='flex flex-row items-center justify-center font-normal text-center text-gray-900'>
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

function SingleMatchDetailsMain({ name, comrade, matchHistory }) {
  console.log('here is where the data matters', name, comrade, matchHistory);
  return (
    <MatchLayout>
      <div className='flex flex-col'>
        <MatchWrapper
          name={name}
          comrade={comrade}
          matchHistory={matchHistory}
        ></MatchWrapper>
      </div>
    </MatchLayout>
  );
}

function MatchLayout({ children }) {
  return (
    <div>
      <div className='relative w-full pb-10 mx-auto bg-gray-200 lg:px-8 max-w-screen-xl md:pb-12'>
        <div className='flex'>
          <div className='flex flex-col justify-center px-2'>Jan 23</div>
          <div className='flex-1 px-2 my-8 border-b-2 border-gray-500'></div>
        </div>
        <div className='overflow-hidden bg-white border-t border-b border-gray-400 lg:border-gray-200 lg:rounded lg:shadow-md'>
          {children}
        </div>
      </div>
    </div>
  );
}

function MatchWrapper({ name, comrade, matchHistory }) {
  return (
    <div>
      <div className='relative overflow-hidden'>
        <MatchDetailsHeader matchHistory={matchHistory}></MatchDetailsHeader>
        <MatchDetails name={name} matchHistory={matchHistory}></MatchDetails>
        <MatchDetails name={comrade} matchHistory={matchHistory}></MatchDetails>
      </div>
    </div>
  );

  function MatchDetailsHeader({ matchHistory }) {
    if (!matchHistory) {
      return null;
    }

    let queueType = matchHistory[0].queueObject.description;
    let gameDuration = matchHistory[0].gameDuration;
    let gameCreation = matchHistory[0].gameCreation;

    let dateTime = getDateTime(gameCreation);
    let dateLeft = gameCreation.toDateString().split(' ');
    dateLeft.pop();
    let trueDate = dateLeft.join(' ') + '  ' + dateTime;
    let trueDate2 = trueDate.replace(/ /g, '\u00a0');

    return (
      <div className='flex items-center justify-between py-3 text-sm border-b border-gray-200'>
        <div className='flex flex-1 min-w-0 px-2 lg:px-3'>
          {/* Ranked Solo */}
          {/* {gameType} */}
          {queueType}
        </div>
        <div className='flex items-center flex-shrink-0 px-3 ml-6'>
          {/* {trueDate2} */}
          {gameDuration}
        </div>
      </div>
    );

    function getDateTime(date) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      let strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
  }

  function MatchDetails({ name, matchHistory }) {
    return (
      <div>
        <div className='flex'>
          <div className='flex flex-col justify-center px-2 mt-2 lg:px-3'>
            {name}
          </div>
          <div className='flex-1 mt-6 mb-4 border-b-2 border-gray-500'></div>
          <div className='flex flex-col justify-center px-2 mt-2 font-bold tracking-wide text-blue-500 lg:px-3'>
            VICTORY
          </div>
        </div>
        <div className='flex justify-between px-2 pb-2 border-b border-gray-200 lg:px-3'>
          <div className='flex flex-col items-center justify-center mt-2 text-center big-picture'>
            <StyledAvatar>M</StyledAvatar>
            <div className='pt-3 text-sm'>Aurelion Sol</div>
          </div>
          <div className='flex justify-center'>
            <div className='flex flex-col items-center justify-between font-semibold text-center'>
              <div>3 / 4 / 3</div>
              <div>160 CS</div>
              <div className='pb-1'>17,727 G</div>
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

// ARCHIVE
// function MatchHistoryDetails() {
//   return (
//     <div>
//       <div className='flex'>
//         <div className='w-1/3 bg-red-400'>
//           <MatchHistorySection1></MatchHistorySection1>
//         </div>
//         <div className='w-1/3 bg-green-400'>sdf</div>
//         <div className='w-1/3 bg-teal-400'>Section 3</div>
//         {/* <div className='w-1/3 py-2 bg-orange-400'>Section 4</div> */}
//         {/* <div className='w-1/5 px-3 py-2 bg-indigo-400'>Section 5</div> */}
//       </div>
//     </div>
//   );
// }

// function MatchHistorySection1() {
//   return (
//     <div className='flex'>
//       <div className='flex flex-col items-center w-1/3 text-center'>
//         <StyledAvatar className='p-2'>M</StyledAvatar>
//         <div className='text-xs'>Mordekaiser</div>
//       </div>
//       <div className='w-2/3'>
//         <div className='tracking-wide text-s'>VICTORY</div>
//         <div className='text-xs'>Normal (Draft Pick)</div>
//         <div className='flex'>
//           <div>F</div>
//           <div>T</div>
//         </div>
//       </div>
//       {/* <div>
//         <div>Normal</div>
//         <div>---</div>
//         <div>Victory</div>
//       </div>
//       <div>
//         <div className='flex'>
//           <StyledAvatar className='flex flex-col justify-center'>
//             M
//           </StyledAvatar>
//           <div className='flex flex-col'>
//             <div className=''>sd</div>
//             <div className=''>sdf</div>
//           </div>
//         </div>
//         <div>Mordekaiser</div>
//       </div> */}
//     </div>
//   );
// }
