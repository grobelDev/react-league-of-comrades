import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const validRegions = {
  NA: 'na1',
  KR: 'kr',
  JP: 'jp1',
  EUW: 'euw1',
  EUN: 'eun1',
  OC: 'oc1',
  BR: 'br1',
  LAS: 'la1',
  LAN: 'la2',
  RU: 'ru',
  TR: 'tr1'
};

const validRegionsReverse = {
  na1: 'NA',
  kr: 'KR',
  jp1: 'JP',
  euw1: 'EUW',
  eun1: 'EUN',
  oc1: 'OC',
  br1: 'BR',
  la1: 'LAS',
  la2: 'LAN',
  ru: 'RU',
  tr1: 'TR'
};

const Header = () => {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');

  let location = useLocation();
  const history = useHistory();

  useEffect(() => {
    let paths = location.pathname.split('/');
    let _region = paths[1];
    // let _name = paths[2];

    setRegion(validRegionsReverse[_region]);
    // setName(_name);
  }, [location]);

  function handleSubmit(event) {
    event.preventDefault();
    history.push(`/${validRegions[region]}/${name}`);
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
            <div className='relative inline-block px-2 w-30'>
              <select
                className='block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline'
                value={region}
                onChange={e => {
                  setRegion(e.target.value);
                }}
              >
                <option>NA</option>
                <option>KR</option>
                <option>JP</option>
                <option>EUW</option>
                <option>EUNE</option>
                <option>OC</option>
                <option>BR</option>
                <option>LAS</option>
                <option>LAN</option>
                <option>RU</option>
                <option>TR</option>
              </select>
              <div className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 pointer-events-none'>
                <svg
                  className='w-4 h-4 fill-current'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
