import React, { useState, Fragment } from 'react';
import styled from 'styled-components';

const MatchHistory = props => {
  const [name, setName] = useState(props.name);
  const [comrade, setComrade] = useState(props.comrade);
  const [profileImage, setProfileImage] = useState(props.profileImage);
  const [count, setCount] = useState(props.count);
  const [matches, setMatches] = useState(props.matches);
  let queues = require('./queues.json');

  return (
    <div>
      <div className='mt-24'>
        <MatchHistoryHero name={name} comrade={comrade}></MatchHistoryHero>
        {matches.map(match => {
          return (
            <SingleMatchDetailsMain
              name={name}
              comrade={comrade}
              match={match}
              key={`${name}/${comrade}/${JSON.stringify(match)}`}
            ></SingleMatchDetailsMain>
          );
        })}
      </div>
    </div>
  );
};

export default MatchHistory;

function MatchHistoryHero({ name, comrade }) {
  return (
    <div>
      <div className='flex justify-center'>
        <div className='flex justify-center w-3/4 p-4 my-8 bg-white border border-gray-600 rounded'>
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

function SingleMatchDetailsMain({ name, comrade, match }) {
  return (
    <MatchLayout match={match}>
      <div className='flex flex-col'>
        <MatchWrapper
          name={name}
          comrade={comrade}
          match={match}
        ></MatchWrapper>
      </div>
    </MatchLayout>
  );
}

function MatchLayout({ children, match }) {
  let gameCreation = new Date(match.Game.creation);

  let dateLeft = gameCreation.toDateString().split(' ');
  dateLeft.pop();
  let monthDayDate = dateLeft.join(' ');

  return (
    <div>
      <div className='relative w-full pb-8 mx-auto bg-gray-200 lg:px-10 max-w-screen-xl md:pb-8'>
        <div className='flex'>
          <div className='flex flex-col justify-center px-2'>
            {monthDayDate}
          </div>
          <div className='flex-1 px-2 my-8 border-b-2 border-gray-500'></div>
        </div>
        <div className='overflow-hidden bg-white border-t border-b border-gray-400 lg:border-gray-200 lg:rounded lg:shadow-md'>
          {children}
        </div>
      </div>
    </div>
  );
}

function MatchWrapper({ name, comrade, match }) {
  return (
    <div>
      <div className='relative overflow-hidden'>
        <MatchDetailsHeader match={match}></MatchDetailsHeader>
        <MatchDetails name={name} userMatch={match.User}></MatchDetails>
        <MatchDetails name={comrade} userMatch={match.Comrade}></MatchDetails>
      </div>
    </div>
  );

  function MatchDetailsHeader({ match }) {
    let queueType = match.Game.queueType.description;
    let gameDuration = match.Game.duration;

    let gameCreation = new Date(match.Game.creation);
    let dateTime = getDateTime(gameCreation);

    return (
      <div className='flex items-center justify-between py-3 text-sm border-b border-gray-200'>
        <div className='flex flex-1 min-w-0 px-2 lg:px-3'>
          {queueType} • {gameDuration}
        </div>
        <div className='flex items-center flex-shrink-0 px-3 ml-6'>
          {dateTime}
        </div>
      </div>
    );
  }

  function MatchDetails({ name, userMatch }) {
    // match[0];
    // console.log('match', match);
    // console.log(userMatch);
    let victory = userMatch.victory;
    let championName = userMatch.championName;
    let championImage = userMatch.championImage;

    let kills = userMatch.kills;
    let deaths = userMatch.deaths;
    let assists = userMatch.assists;
    let creepScore = userMatch.creepScore;
    let goldEarned = numberWithCommas(userMatch.goldEarned);

    let item0 = userMatch.item0;
    let item1 = userMatch.item1;
    let item2 = userMatch.item2;
    let item3 = userMatch.item3;
    let item4 = userMatch.item4;
    let item5 = userMatch.item5;
    let item6 = userMatch.item6;

    return (
      <div>
        <VictoryDefeatBanner
          name={name}
          victory={victory}
        ></VictoryDefeatBanner>
        <div className='flex justify-between px-2 pb-2 border-b border-gray-200 lg:px-3'>
          <div className='flex flex-col items-center justify-center mt-2 text-center big-picture'>
            <StyledAvatar>
              <img
                src={championImage}
                className='rounded-full'
                alt='champion image'
              ></img>
            </StyledAvatar>
            <div className='pt-3 text-sm'>{championName}</div>
          </div>
          <div className='flex justify-center'>
            <div className='flex flex-col items-center justify-between font-semibold text-center'>
              <div>
                {kills} / {deaths} / {assists}
              </div>
              <div>{creepScore} CS</div>
              <div className='pb-1'>{goldEarned} G</div>
            </div>
          </div>
          <div className='flex justify-end '>
            <div className='flex flex-col justify-center'>
              <div className='flex justify-between'>
                <div className='flex flex-col'>
                  <CustomStyledAvatarSquare>
                    {item0 ? <img src={item0} alt='item 0'></img> : null}
                  </CustomStyledAvatarSquare>
                  <CustomStyledAvatarSquare>
                    {item1 ? <img src={item1} alt='item 1'></img> : null}
                  </CustomStyledAvatarSquare>
                </div>
                <div className='flex flex-col'>
                  <CustomStyledAvatarSquare>
                    {item2 ? <img src={item2} alt='item 2'></img> : null}
                  </CustomStyledAvatarSquare>
                  <CustomStyledAvatarSquare>
                    {item3 ? <img src={item3} alt='item 3'></img> : null}
                  </CustomStyledAvatarSquare>
                </div>
                <div className='flex flex-col'>
                  <CustomStyledAvatarSquare>
                    {item4 ? <img src={item4} alt='item 4'></img> : null}
                  </CustomStyledAvatarSquare>
                  <CustomStyledAvatarSquare>
                    {item5 ? <img src={item5} alt='item 5'></img> : null}
                  </CustomStyledAvatarSquare>
                </div>
                <div className='flex flex-col justify-center'>
                  <CustomStyledAvatarSquare>
                    {item6 ? <img src={item6} alt='item 6'></img> : null}
                  </CustomStyledAvatarSquare>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }

  function CustomStyledAvatarSquare({ children }) {
    return <StyledAvatarSquare className='m-1'>{children}</StyledAvatarSquare>;
  }

  function VictoryDefeatBanner({ name, victory }) {
    return (
      <Fragment>
        {victory ? (
          <div className='flex'>
            <div className='flex flex-col justify-center px-2 mt-2 lg:px-3'>
              {name}
            </div>
            <div className='flex-1 mt-6 mb-4 border-b-2 border-gray-500'></div>
            <div className='flex flex-col justify-center px-2 mt-2 font-bold tracking-wide text-blue-500 lg:px-3'>
              VICTORY
            </div>
          </div>
        ) : (
          <div className='flex'>
            <div className='flex flex-col justify-center px-2 mt-2 lg:px-3'>
              {name}
            </div>
            <div className='flex-1 mt-6 mb-4 border-b-2 border-gray-500'></div>
            <div className='flex flex-col justify-center px-2 mt-2 font-bold tracking-wide text-red-500 lg:px-3'>
              DEFEAT
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export const StyledAvatar = styled.div`
  background-color: #f3f3f3;
  height: 3.5rem;
  width: 3.5rem;
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

// ARCHIVE
// function matchDetails() {
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

{
  /* {matchHistory ? (
        <div>
          <div className='mt-24'>
            <MatchHistoryHero name={name} comrade={comrade}></MatchHistoryHero>
            {/* {matchHistory.map(match => {
              return (
                <SingleMatchDetailsMain
                  name={name}
                  comrade={comrade}
                  match={match}
                  key={`${name}/${comrade}/${JSON.stringify(match)}`}
                ></SingleMatchDetailsMain>
              );
            })} */
}

// </div>
//
// </div>
// function getDateTime(date) {
//   let hours = date.getHours();
//   let minutes = date.getMinutes();
//   let ampm = hours >= 12 ? 'PM' : 'AM';
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   minutes = minutes < 10 ? '0' + minutes : minutes;
//   let strTime = hours + ':' + minutes + ' ' + ampm;
//   return strTime;
// }
// if (!match) {
//   return null;
// }

// let queueType = match.queueObject.description;
// let gameDuration = match.gameDuration;

// let gameCreation = match.gameCreation;
// let dateTime = getDateTime(gameCreation);
// let dateLeft = gameCreation.toDateString().split(' ');
// dateLeft.pop();
// let monthDayDate = dateLeft.join(' ');

// let betterQueueType = queueType.replace(/\s(games+)$\s+/, '');
// console.log(better)
