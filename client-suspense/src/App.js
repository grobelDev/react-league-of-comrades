import React, { useState, useTransition, Suspense, useEffect } from 'react';
import { fetchUserData } from './locApi';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useLocation,
  Redirect,
  useRouteMatch
} from 'react-router-dom';
import Header from './Header';
import SummonerList from './SummonerList';

function Button({ children, onClick }) {
  const DelayedSpinner = styled.div`
    animation: 0s linear 0.5s forwards makeVisible;
    visibility: hidden;

    @keyframes makeVisible {
      to {
        visibility: visible;
      }
  `;

  const Spinner = styled.div`
    border: 4px solid #f3f3f3; /* Light grey */
    border-top: 4px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 20px;
    height: 20px;
    opacity: 1;
    animation: spin 2s linear infinite;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  const [startTransition, isPending] = useTransition({
    timeoutMs: 10000
  });

  function handleClick() {
    startTransition(() => {
      onClick();
    });
  }

  return (
    <>
      <div className='flex'>
        {isPending ? (
          <button
            className='px-4 py-2 m-2 font-bold text-white bg-blue-500 rounded opacity-50 cursor-not-allowed'
            onClick={handleClick}
            disabled={isPending}
          >
            {children}
          </button>
        ) : (
          <button
            className='px-4 py-2 m-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
            onClick={handleClick}
            disabled={isPending}
          >
            {children}
          </button>
        )}

        {isPending ? (
          <DelayedSpinner className='flex flex-col justify-center pl-2'>
            <Spinner />
          </DelayedSpinner>
        ) : null}
      </div>
    </>
  );
}

let testData = [
  {
    name: 'doublelift',
    region: 'na1'
  },
  {
    name: 'anti213',
    region: 'na1'
  },
  {
    name: 'kamikazetomato',
    region: 'na1'
  }
];

function getNextIndex(id) {
  return id === 2 ? 0 : id + 1;
}

// function getParams()
// function useFetch() {
//   let UserMatch = useRouteMatch('/:region/:name');
//   let ComradeMatch = useRouteMatch('/:region/:name/:comrade');
//   const params = UserMatch.params;
//   const userName = params.name;
//   const userRegion = params.region;
//   const resource = fetchUserData(userName, userRegion);
//   return resource;
// }

// function useFetchResource() {
//   let UserMatch = useRouteMatch('/:region/:name');
//   const params = UserMatch.params;
//   const userName = params.name;
//   const userRegion = params.region;
//   const resource = fetchUserData(userName, userRegion);
//   console.log('asdflajfdslk');
//   return resource;
// }

// let initialResource2 = useFetchResource();
const initialResource = fetchUserData('doublelift', 'na1');

function App() {
  const [startTransition, isPending] = useTransition({
    // Wait 10 seconds before fallback
    timeoutMs: 10000
  });

  // state
  const [resource, setResource] = useState(initialResource);
  const [resourceStore, setResourceStore] = useState({});

  // hooks
  let UserMatch = useRouteMatch('/:region/:name');
  let location = useLocation();

  // if (dataStore[name]) {
  //   console.log('getting stored data');
  //   setLoading(false);
  //   setData(dataStore[name].data);
  //   console.log(dataStore);
  //   return;
  // }
  // let comradesPromise = fetchComrades(userName, userRegion);
  // return {
  //   userName,
  //   userRegion,
  //   comrades: wrapPromise(comradesPromise)
  // };
  // if (!dataStore[name]) {
  //   setDataStore(dataStore => {
  //     let newDataStore = { ...dataStore };
  //     newDataStore[name] = {
  //       name: name,
  //       region: region,
  //       data: myJson
  //     };
  //     return newDataStore;
  //   });
  // }

  useEffect(() => {
    if (UserMatch.isExact) {
      const params = UserMatch.params;
      const userName = params.name;
      const userRegion = params.region;

      if (resourceStore[userName]) {
        // setData
        console.log('already stored this data!');
        console.log(resourceStore);
        let cachedResource = resourceStore[userName].resource;
        startTransition(() => {
          setResource(cachedResource);
        });
      } else {
        const resource = fetchUserData(userName, userRegion);
        startTransition(() => {
          setResourceStore(resourceStore => {
            console.log('storing data!');
            let newResourceStore = { ...resourceStore };
            newResourceStore[userName] = {
              userName: userName,
              resource: resource
            };
            return newResourceStore;
          });
          setResource(resource);
        });
      }
    }
  }, [location]);

  function handleRefreshClick() {
    const currentIndex = testData.findIndex(
      user => user.name.toUpperCase() === resource.userName.toUpperCase()
    );
    console.log(currentIndex);
    const nextIndex = getNextIndex(currentIndex);
    setResource(
      fetchUserData(testData[nextIndex].name, testData[nextIndex].region)
    );
  }

  return (
    <div>
      <Switch>
        <Redirect exact from='/' to='/na1/Doublelift' />
        {/* <Route
          path='/'
          exact
          render={() => {
            return (
              <div>
                <Header />
                <div className='mt-16'>
                  <SummonerList></SummonerList>
                </div>
              </div>
            );
          }}
        /> */}
        <Route
          exact
          path='/:region/:name'
          render={() => {
            return (
              <div>
                <Header />
                <div className='mt-16'>
                  <div>UserPage</div>
                  <Button onClick={handleRefreshClick}>Update</Button>
                  <SummonerListWrapper
                    resource={resource}
                  ></SummonerListWrapper>
                </div>
              </div>
            );
          }}
        />
        <Route
          path='/:region/:name/:comrade'
          render={() => {
            return (
              <div>
                <Header />
                <div className='mt-16'>
                  <div>ComradePage</div>
                </div>
              </div>
            );
          }}
        />
        <Route
          path='/'
          render={() => {
            return <div>404</div>;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;

function SummonerListWrapper({ resource }) {
  return (
    <ErrorBoundary
      fallback={
        <div>
          Could not find Summoner. <br />
          Either this Summoner doesn't exist, it's the wrong region, or they
          changed their name recently.
        </div>
      }
    >
      <Suspense fallback={<div>Loading Data...</div>}>
        <SummonerListDetails resource={resource}></SummonerListDetails>
      </Suspense>
    </ErrorBoundary>
  );
}

function parseData(name, data) {
  let formattedName = data.find(
    player => player.name.toLowerCase() === name.toLowerCase()
  ).name;

  let filteredData = data.filter(player => player.name !== formattedName);

  let newData = filteredData.map((player, index) => {
    let message = `Played together ${player.count} times.`;
    let avatar = player.name[0];
    let id = index + 1;
    let playerObject = {
      title: player.name,
      message: message,
      avatar: avatar,
      id: id
    };
    return playerObject;
  });

  let emailIds = [...new Array(newData.length).keys()];
  let emails = newData;

  // update name formatting
  return { formattedName, emails, emailIds };
}

function SummonerListDetails({ resource }) {
  const name = resource.userName;
  const data = resource.comrades.read();
  let parsedData = parseData(name, data);

  return (
    <SummonerList
      name={parsedData.formattedName}
      emails={parsedData.emails}
      emailIds={parsedData.emailIds}
    ></SummonerList>
  );
}

function UserPage({ resource }) {
  return (
    <ErrorBoundary
      fallback={
        <div>
          Could not find Summoner. <br />
          Either this Summoner doesn't exist, it's the wrong region, or they
          changed their name recently.
        </div>
      }
    >
      <Suspense fallback={<div>Loading Data...</div>}>
        <UserDetails resource={resource}></UserDetails>
      </Suspense>
    </ErrorBoundary>
  );
}

function UserDetails({ resource }) {
  const comrades = resource.comrades.read();

  return <div>{JSON.stringify(comrades)}</div>;
}

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// ARCHIVE
// function oldReturn() {
//   return (
//     <div>
//       <div className='text-4xl font-bold text-center text-blue-600'>
//         Tailwind Test
//       </div>
//       <Button onClick={handleRefreshClick}>Update</Button>
//       <UserPage resource={resource}></UserPage>
//     </div>
//   );
// }
