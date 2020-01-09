import React from 'react';

export default function App() {
  return (
    <div>
      <div className='text-4xl font-bold text-center text-blue-500'>
        League of Comrades
      </div>
      <div className='flex justify-center'>
        <button className='px-4 py-2 font-normal text-white bg-blue-500 rounded hover:bg-blue-700'>
          Ping Server
        </button>
      </div>
    </div>
  );
}
