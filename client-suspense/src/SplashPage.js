import React from 'react';
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom';

export default function SplashPage() {
  return (
    <div className='mt-16'>
      <div className='p-6 bg-white'>
        <Hero></Hero>
        {/* <div className='font-medium'>STATUS: BETA</div>
        <div>Welcome to League of Comrades.</div>
        <div>
          Use the Search Bar to look up how a Summoner plays with their
          Comrades.
        </div>
        <div>Also, find detailed statistics from their most recent games.</div>
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
                to='na1/BUZZLIGHTYEAR99'
              >
                Tyler1 - (BUZZLIGHTYEAR99)
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
        </div> */}
      </div>
    </div>
  );
}

function Hero() {
  let history = useHistory();

  function RandomExample() {
    let randomSummoners = [
      '/na1/Doublelift',
      'na1/BUZZLIGHTYEAR99',
      '/kr/hide%20on%20bush'
    ];

    let randomNumber = Math.floor(Math.random() * 3);
    history.push(randomSummoners[randomNumber]);
  }

  return (
    <div className='relative w-full px-6 pt-16 pb-40 mx-auto max-w-screen-xl md:pb-24'>
      <div className='-mx-6 xl:flex'>
        <div className='max-w-2xl px-6 mx-auto text-left md:text-center xl:text-left md:max-w-3xl'>
          <h1 className='text-3xl font-light leading-tight sm:text-4xl md:text-5xl xl:text-4xl'>
            Hello, and Welcome. <br></br>
            <span className='font-normal text-blue-500 sm:block'>
              This is League of Comrades.
            </span>
          </h1>
          <p className='mt-6 leading-relaxed text-gray-600 sm:text-lg md:text-xl xl:text-lg'>
            Look up your comrades and see who they play the most with. <br></br>
            Find detailed breakdowns of player specific match histories.{' '}
            <br></br>
            Use the search bar above, or click on the button to see a sample
            profile.<br></br>Better support for larger screen sizes is coming
            soon.
          </p>
          {/* <p className="mt-6 leading-relaxed text-gray-600 sm:text-lg md:text-xl xl:text-lg">
        I believe in maintanable code and in doing my part against
        spaghetti code.
      </p> */}
          <div
            // onClick={() => scrollToRef(myRef)}
            className='flex justify-start mt-6 md:justify-center xl:justify-start'
          >
            <button
              onClick={() => RandomExample()}
              className='px-4 py-3 font-semibold leading-tight text-white bg-blue-500 rounded-lg shadow-md md:px-5 xl:px-4 md:py-4 xl:py-3 hover:bg-blue-600 md:text-lg xl:text-base'
            >
              Find Summoner
            </button>
            {/* onClick={()=>scrollToRef(myRef) */}
          </div>
        </div>
      </div>
    </div>
  );
}
