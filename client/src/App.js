import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
// import GlobalStyle from "./GlobalStyle"
// import SwipeableTabs from "./SwipeableTabs"
import SummonerList from './SummonerList';
// import MusicDrawer from "./MusicDrawer"
// import PhotoGrid from "./PhotoGrid"
// import Notification from "./Notification"

const StyledNav = styled.nav`
  padding: 1.5rem;
  li {
    display: block;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
  h1 {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    font-weight: bold;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
`;

const MessageWrapper = styled.div`
  display: none;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-top: 1rem;
  background: blue;
  color: white;

  @media (min-width: 768px) {
    display: block;
  }
`;

const MobileWarning = () => {
  return <MessageWrapper>Currently only optimized for mobile!</MessageWrapper>;
};

const routes = [
  { path: '/summoner-list', component: SummonerList, title: 'Summoner List' }
  // { path: "/music-drawer", component: MusicDrawer, title: "Music drawer" },
  // {
  //   path: "/swipeable-tabs",
  //   component: SwipeableTabs,
  //   title: "Swipeable Tabs"
  // },
  // { path: "/photo-grid", component: PhotoGrid, title: "Photo Grid" },
  // { path: "/notification", component: Notification, title: "Notification" }
];

const CustomHeader = () => {
  return (
    <div id='header'>
      <div className='fixed inset-x-0 top-0 z-10 flex items-center h-16 bg-white border-b border-gray-200'>
        <div className='relative w-full px-6 mx-auto max-w-screen-xl'>
          <div className='flex items-center -mx-6'>
            <div className='pl-6 pr-6 lg:w-1/4 xl:w-1/5 lg:pr-8'>
              <div className='flex items-center'>
                <a href='/summoner-list' className='block lg:mr-4'>
                  LoC
                </a>
              </div>
            </div>
            <div className='flex flex-grow bg-gray lg:w-3/4 xl:w-4/5'>
              <div className='w-full lg:px-6 xl:w-3/4 xl:px-12'>
                <div className='relative'>
                  <div>
                    <input
                      className='block w-full py-2 pl-10 pr-4 leading-normal placeholder-gray-600 bg-gray-200 border border-transparent rounded-lg appearance-none transition focus:outline-0 focus:bg-white focus:border-gray-300 ds-input'
                      placeholder='Search Summoner'
                    ></input>
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
              className='flex items-center px-6 text-gray-500 lg:hidden focus:outline-none focus:text-gray-700'
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

function App() {
  // const [response, setResponse] = useState('');

  // let url = 'https://server-nch7pipeyq-uc.a.run.app';
  // let testUrl = 'http://localhost:8080';

  // async function pingServer() {
  //   fetch(testUrl)
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(myJson => {
  //       console.log(myJson);
  //       setResponse(JSON.stringify(myJson));
  //     });
  // }

  // if (!response) {
  //   // pingServer();
  // }

  return (
    <div>
      <MobileWarning />

      {/* <div> */}
      {/* TestFetch Results: */}
      {/* {response ? <div>{response}</div> : <div>Getting Data</div>} */}
      {/* </div> */}
      <Router>
        {/* <GlobalStyle /> */}
        <Switch>
          <Route
            path='/'
            exact
            render={() => {
              return (
                <StyledNav>
                  <h1>Touch-Driven Mobile UI</h1>
                  <ul>
                    {routes.map(r => (
                      <li key={r.title}>
                        <Link to={r.path}>{r.title}</Link>
                      </li>
                    ))}
                  </ul>
                </StyledNav>
              );
            }}
          />
          {routes.map(r => {
            const Component = r.component;
            return (
              <div>
                <Route path={r.path} key={r.path}>
                  <CustomHeader></CustomHeader>
                  <div className='mt-16'>
                    <Component />
                  </div>
                </Route>
              </div>
            );
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
