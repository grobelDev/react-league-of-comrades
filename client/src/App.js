import React, { useState } from 'react';

// function buttonPress() {
//   console.log('button was pressed');
// }

export default function App() {
  const [response, setResponse] = useState('');

  let url = 'https://server-nch7pipeyq-uc.a.run.app';
  let testUrl = 'http://localhost:8080';

  async function pingServer() {
    fetch(testUrl)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        console.log(myJson);
        setResponse(JSON.stringify(myJson));
      });
  }

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
      <div className='flex justify-center'>{response}</div>
    </div>
  );
}
