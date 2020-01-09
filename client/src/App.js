// import React, { useState } from 'react';

// export default function App() {
//   const [response, setResponse] = useState('');

//   let url = 'https://server-nch7pipeyq-uc.a.run.app';
//   let testUrl = 'http://localhost:8080';

//   async function pingServer() {
//     fetch(testUrl)
//       .then(response => {
//         return response.json();
//       })
//       .then(myJson => {
//         console.log(myJson);
//         setResponse(JSON.stringify(myJson));
//       });
//   }

//   return (
//     <div>
//       <div className='p-2 text-4xl font-bold text-center text-blue-500'>
//         League of Comrades
//       </div>
//       <div className='p-2'></div>
//       <div className='flex justify-center'>
//         <button
//           className='px-4 py-2 font-normal text-white bg-blue-500 rounded hover:bg-blue-700'
//           onClick={() => pingServer()}
//         >
//           Ping Server
//         </button>
//       </div>
//       <div className='flex justify-center p-2'>{response}</div>
//     </div>
//   );
// }

import React from 'react';
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
  return (
    <MessageWrapper>
      These demos should be viewed on a mobile device, an emulator or the mobile
      view in your devtools.
    </MessageWrapper>
  );
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

function App() {
  return (
    <div>
      <MobileWarning />
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
              <Route path={r.path} key={r.path}>
                <Component />
              </Route>
            );
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
