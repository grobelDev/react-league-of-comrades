import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

export default function SplashPage() {
  return (
    <div className='mx-5 mt-20'>
      <div>STATUS: BETA</div>
      <div>Welcome to League of Comrades.</div>
      <div>
        Use the Search Bar to look up who a Summoner plays the best with.
      </div>
      <div>Also, find detailed statistics from the most recent games.</div>
      <div className='mt-4'>
        <div>Here are some examples to get you started:</div>
        <div>
          <Link
            className='text-blue-500 hover:text-blue-800'
            to='/na1/Doublelift'
          >
            Doublelift - (Doublelift)
          </Link>
          <div>
            <Link
              className='text-blue-500 hover:text-blue-800'
              to='na1/s8%20is%20so%20fun'
            >
              Tyler1 - (S8 IS SO FUN)
            </Link>
          </div>
          <div>
            <Link
              className='text-blue-500 hover:text-blue-800'
              to='/kr/hide%20on%20bush'
            >
              Faker - (Hide On Bush)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
