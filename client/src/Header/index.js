import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const [name, setName] = useState('');
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    history.push(`/na1/${name}`);
  }

  return (
    <div id='header'>
      <div className='fixed inset-x-0 top-0 z-10 flex items-center h-16 bg-white border-b border-gray-200'>
        <div className='relative w-full px-6 mx-auto max-w-screen-xl'>
          <div className='flex items-center -mx-6'>
            <div className='pl-6 pr-6'>
              <div className='flex items-center'>
                <a href='/' className='block'>
                  LoC
                </a>
              </div>
            </div>
            <div className='flex flex-grow bg-gray'>
              <div className='w-full'>
                <div className='relative'>
                  <div>
                    <form onSubmit={handleSubmit}>
                      <input
                        className='block w-full py-2 pl-10 pr-4 leading-normal placeholder-gray-600 bg-gray-200 border border-transparent rounded-lg appearance-none transition focus:outline-0 focus:bg-white focus:border-gray-300 ds-input'
                        placeholder='Summoner Search'
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                      ></input>
                    </form>
                  </div>
                  <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
                    <svg
                      className='w-4 h-4 text-gray-600 pointer-events-none fill-current'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z'></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <button
              type='button'
              id='sidebar-open'
              className='flex items-center px-6 text-gray-500 focus:outline-none focus:text-gray-700'
            >
              <svg
                className='w-4 h-4 fill-current'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'></path>
              </svg>
            </button>{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
