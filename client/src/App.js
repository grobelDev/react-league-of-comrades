import React, {
  useState,
  useEffect,
  Suspense
  // , useContext
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useLocation,
  Redirect
} from 'react-router-dom';
// import styled from 'styled-components';
// import GlobalStyle from "./GlobalStyle"
// import SwipeableTabs from "./SwipeableTabs"
import SummonerList from './SummonerList';
// import MusicDrawer from "./MusicDrawer"
// import PhotoGrid from "./PhotoGrid"
// import Notification from "./Notification"
import Header from './Header';
// import SearchContext from './SearchContext';
import MatchHistory from './MatchHistory';

// const routes = [
//   { path: '/summoner-list', component: SummonerList, title: 'Summoner List' }
//   // { path: "/music-drawer", component: MusicDrawer, title: "Music drawer" },
//   // {
//   //   path: "/swipeable-tabs",
//   //   component: SwipeableTabs,
//   //   title: "Swipeable Tabs"
//   // },
//   // { path: "/photo-grid", component: PhotoGrid, title: "Photo Grid" },
//   // { path: "/notification", component: Notification, title: "Notification" }
// ];

function fakePromise() {}

const initialResource = fetchDataV3('Doublelift', 'na1');

function App() {
  // const [name, setName] = useState('');
  // const [locationWatcher, setLocationWatcher] = useState(null);
  // const [dataWatcher, setDataWatcher] = useState(null);
  // const [paramWatcher, setParamWatcher] = useState({ name: '', region: '' });
  // let location = useLocation();
  // const [currentUrl, setCurrentUrl] = useState(null);

  // NEW
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataStore, setDataStore] = useState({});
  const [fetchObject, setFetchObject] = useState({});
  const [nameWatcher, setNameWatcher] = useState(null);

  function RouteListener() {
    const { name, region, comrade } = useParams();

    if (fetchObject.name !== name || fetchObject.region !== region) {
      setFetchObject({
        name: name,
        region: region,
        comrade: comrade
      });
    }

    return null;
  }

  useEffect(() => {
    function fetchData(name, region) {
      if (!name || !region) {
        return;
      }
      setNameWatcher(name);

      if (dataStore[name]) {
        console.log('getting stored data');
        setLoading(false);
        setData(dataStore[name].data);
        console.log(dataStore);
        return;
      }

      setLoading(true);
      console.log('fetching data');
      let url = 'https://server-nch7pipeyq-uc.a.run.app';
      let testUrl = 'http://localhost:8080';
      let currentUrl = url;

      let fetchUrl = new URL(currentUrl),
        params = { name: name, region: region };
      Object.keys(params).forEach(key =>
        fetchUrl.searchParams.append(key, params[key])
      );

      // fixes weird characters
      fetchUrl.href = encodeURI(fetchUrl);

      fetch(fetchUrl)
        .then(response => {
          return response.json();
        })
        .then(myJson => {
          setLoading(false);

          if (!dataStore[name]) {
            setDataStore(dataStore => {
              let newDataStore = { ...dataStore };
              newDataStore[name] = {
                name: name,
                region: region,
                data: myJson
              };
              return newDataStore;
            });
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    fetchData(fetchObject.name, fetchObject.region);
  }, [fetchObject, dataStore]);

  useEffect(() => {
    if (dataStore[nameWatcher]) {
      setData(dataStore[nameWatcher].data);
    }
  }, [dataStore]);

  //
  //
  //
  //
  //
  //
  function fetchDataV2(name, region) {
    let url = 'https://server-nch7pipeyq-uc.a.run.app';
    let testUrl = 'http://localhost:8080';
    let currentUrl = url;

    let fetchUrl = new URL(currentUrl),
      params = { name: name, region: region };
    Object.keys(params).forEach(key =>
      fetchUrl.searchParams.append(key, params[key])
    );

    // fixes weird characters
    fetchUrl.href = encodeURI(fetchUrl);

    fetch(fetchUrl)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        setLoading(false);

        if (!dataStore[name]) {
          setDataStore(dataStore => {
            let newDataStore = { ...dataStore };
            newDataStore[name] = {
              name: name,
              region: region,
              data: myJson
            };
            return newDataStore;
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function SummonerPage() {}

  function FunctionalSummonerList() {
    const { name, region } = useParams();

    if (!dataStore[name]) {
      setLoading(true);
      fetchDataV2(name, region);
      setLoading(false);
      console.log(loading);
    }

    // console.log(name, region);
    // console.log(dataStore);

    return (
      <div>
        <div>{`${name} - ${region}`}</div>
        <div>{JSON.stringify(dataStore[name])}</div>
      </div>
    );
  }

  const [resource, setResource] = useState(initialResource);

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
                  <SuspensePage resource={resource}></SuspensePage>
                  {/* {loading ? <div>'Loading'</div> : <div>'dsfdsf</div>} */}
                  {/* <FunctionalSummonerList></FunctionalSummonerList> */}

                  {/* <SummonerListWithParams /> */}
                  {/* <RouteListener></RouteListener> */}
                  {/* <SummonerList
                    name={fetchObject.name}
                    data={data}
                    loading={loading}
                  ></SummonerList> */}
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
                  {/* <MatchHistoryWithParams></MatchHistoryWithParams> */}
                  {/* <MatchHistory
                    name={fetchObject.name}
                    data={data}
                    comrade={fetchObject.comrade}
                  ></MatchHistory> */}
                  <div>dsfds</div>
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

function fetchDataV3(name, region) {
  let url = 'https://server-nch7pipeyq-uc.a.run.app';
  let testUrl = 'http://localhost:8080';
  let currentUrl = url;

  let fetchUrl = new URL(currentUrl),
    params = { name: name, region: region };
  Object.keys(params).forEach(key =>
    fetchUrl.searchParams.append(key, params[key])
  );

  // fixes weird characters
  fetchUrl.href = encodeURI(fetchUrl);

  fetch(fetchUrl)
    .then(response => {
      return response.json();
    })
    .then(myJson => {
      console.log(myJson);
      return myJson;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function DataDetails({ resource }) {
  const name = resource;
  return <div>{name}</div>;
}
// ARCHIVE:

// function App() {
//   return (
//     <div>
//       <Router>
//         <Switch>
//           <Route
//             path='/'
//             exact
//             render={() => {
//               return (
//                 <StyledNav>
//                   <h1>Touch-Driven Mobile UI</h1>
//                   <ul>
//                     {routes.map(r => (
//                       <li key={r.title}>
//                         <Link to={r.path}>{r.title}</Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </StyledNav>
//               );
//             }}
//           />
//           {routes.map(r => {
//             const Component = r.component;
//             return (
//               <div>
//                 <Route path={r.path} key={r.path}>
//                   <CustomHeader></CustomHeader>
//                   <div className='mt-16'>
//                     <Component exampleProp='17' />
//                   </div>
//                 </Route>
//               </div>
//             );
//           })}
//         </Switch>
//       </Router>
//     </div>
//   );
// }

// const StyledNav = styled.nav`
//   padding: 1.5rem;
//   li {
//     display: block;
//     margin-bottom: 1.5rem;
//     font-size: 1.1rem;
//   }
//   h1 {
//     font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
//       'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
//       'Helvetica Neue', sans-serif;
//     font-weight: bold;
//     margin-bottom: 1.5rem;
//     font-size: 1.5rem;
//   }
// `;

// const MessageWrapper = styled.div`
//   display: none;
//   padding-bottom: 1rem;
//   padding-left: 1rem;
//   padding-top: 1rem;
//   background: blue;
//   color: white;

//   @media (min-width: 768px) {
//     display: block;
//   }
// `;

// const MobileWarning = () => {
//   return <MessageWrapper>Currently only optimized for mobile!</MessageWrapper>;
// };

// function BlogPost() {
//   let { region, name } = useParams();
//   console.log(region, name);
//   setRegion(region);
//   setName(name);

//   return <div>{`Summoner ${name} is from ${region}`}</div>;
// }

// useEffect(() => {

// })
// function SummonerListWithParams() {
//   const { name, region } = useParams();

//   useEffect(() => {
//     function fetchData(name, region) {
//       if (!name || !region) {
//         return;
//       }

//       let url = 'https://server-nch7pipeyq-uc.a.run.app';
//       let testUrl = 'http://localhost:8080';
//       let currentUrl = url;

//       let fetchUrl = new URL(currentUrl),
//         params = { name: name, region: region };
//       Object.keys(params).forEach(key =>
//         fetchUrl.searchParams.append(key, params[key])
//       );

//       fetch(fetchUrl)
//         .then(response => {
//           return response.json();
//         })
//         .then(myJson => {
//           setData(myJson);
//         })
//         .catch(error => {
//           console.error('Error:', error);
//         });
//     }

//     if (location !== locationWatcher) {
//       if (paramWatcher.name !== name || paramWatcher.region !== region) {
//         console.log('new link');
//         setData(null);
//         setParamWatcher({
//           name: name,
//           region: region
//         });
//       }

//       setLocationWatcher(location);
//       fetchData(name, region);
//     }
//   }, [location]);

//   return <SummonerList name={name} data={data}></SummonerList>;
// }

// function MatchHistoryWithParams() {
//   const { name, region, comrade } = useParams();

//   useEffect(() => {
//     function fetchData(name, region) {
//       let url = 'https://server-nch7pipeyq-uc.a.run.app';
//       let testUrl = 'http://localhost:8080';
//       let currentUrl = url;

//       if (!name || !region) {
//         return;
//       }

//       let fetchUrl = new URL(currentUrl),
//         params = { name: name, region: region };
//       Object.keys(params).forEach(key =>
//         fetchUrl.searchParams.append(key, params[key])
//       );

//       fetch(fetchUrl)
//         .then(response => {
//           return response.json();
//         })
//         .then(myJson => {
//           setData(myJson);
//         });
//     }

//     if (location !== locationWatcher) {
//       setLocationWatcher(location);
//       // setName(name);
//       fetchData(name, region);
//     }
//   }, [location]);
//   return (
//     <MatchHistory name={name} data={data} comrade={comrade}></MatchHistory>
//   );
// }

export default App;
