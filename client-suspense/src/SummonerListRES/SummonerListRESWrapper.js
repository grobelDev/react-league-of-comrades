import React, { useState, useEffect, Suspense, Fragment } from 'react';
import FadeIn from 'react-fade-in';

import SummonerListRES from '../SummonerListRES';
import Spinner from '../Spinner';

export default function SummonerListRESWrapper({ resource }) {
  // console.log(resource);

  return (
    <div>
      <div>
        <Suspense
          fallback={
            <FadeIn>
              <Spinner></Spinner>
            </FadeIn>
          }
        >
          <SummonerListRESDetails resource={resource}></SummonerListRESDetails>
        </Suspense>
      </div>
    </div>
  );
}

function SummonerListRESDetails({ resource }) {
  let data = resource.results.read();

  // computed values
  let name = data.userName;
  let count = data.gameCount;
  let cellIds = [...new Array(data.playerData.length).keys()];

  let playerData = data.playerData;
  let cells = getCells(name, playerData);

  return (
    <Fragment>
      <SummonerListRES
        name={name}
        count={count}
        cellIds={cellIds}
        cells={cells}
      ></SummonerListRES>
      {/* Testing Image Lazy Loading
      <Suspense fallback={<div>Image Loading...</div>}>
        <TestImageLoading resource={resource}></TestImageLoading>
      </Suspense>
      <div>{JSON.stringify(data, null, 2)}</div> */}
    </Fragment>
  );

  function getCells(name, data) {
    let filteredData = data.filter(player => player.name !== name);

    let cellData = filteredData.map((player, index) => {
      let message = `Played together ${player.count} times.`;
      let avatar = player.name[0];
      let profileImage = player.profileImage;
      let id = index + 1;
      let playerObject = {
        title: player.name,
        message: message,
        avatar: avatar,
        profileImage: profileImage,
        id: id
      };
      return playerObject;
    });

    return cellData;
  }
}

function TestImageLoading({ resource }) {
  let data = resource.results.read();
  let testImageSrc = data.profileImage;
  return <img src={testImageSrc}></img>;
}

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
