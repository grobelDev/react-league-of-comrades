import React, { useState, useTransition, Suspense } from 'react';
import { fetchUserData } from './locApi';
import styled from 'styled-components';
// import './css/spinner.css';

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
  //

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

const initialResource = fetchUserData('doublelift', 'na1');

function App() {
  const [resource, setResource] = useState(initialResource);

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
    <div className='App'>
      <div className='text-4xl font-bold text-center text-blue-600'>
        Tailwind Test
      </div>

      <Button onClick={handleRefreshClick}>Update</Button>
      <UserPage resource={resource}></UserPage>
    </div>
  );
}

export default App;

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
