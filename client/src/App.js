import React from 'react';

// function buttonPress() {
//   console.log('button was pressed');
// }

async function pingServer() {
  // // let serverUrl = 'https://server-nch7pipeyq-uc.a.run.app';
  // let serverUrl2 = 'http://localhost:8080';
  // let response = await fetch(serverUrl2);
  // // response.json();
  // if (response.ok) {
  //   // const _response = await response.json();
  //   console.log(response);
  //   // return response2.accountId;

  fetch('https://server-nch7pipeyq-uc.a.run.app')
    .then(response => {
      return response.json();
    })
    .then(myJson => {
      console.log(myJson);
    });
}

export default function App() {
  return (
    <div>
      <div className='text-4xl font-bold text-center text-blue-500'>
        League of Comrades
      </div>
      <div className='flex justify-center'>
        <button
          className='px-4 py-2 font-normal text-white bg-blue-500 rounded hover:bg-blue-700'
          onClick={() => pingServer()}
        >
          Ping Server
        </button>
      </div>
    </div>
  );
}
