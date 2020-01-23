import React, { useState, useTransition, Suspense, useEffect } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import { StyledCollapseHandler, StyledListItem } from './styled-components';
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

const StyledEmailList = styled.ul``;

const TestSpinner = styled.div`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
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

const exitDuration = 250;

const SummonerList = ({ resource, isPending }) => {
  // const [startTransition, isPending] = useTransition({
  //   timeoutMs: 10000
  // });

  let location = useLocation();

  // const [name, setName] = useState(props.name);
  // const [emails, setEmails] = useState(props.emails);

  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(null);
  // NON-CUSTOM CODE
  // const messageIds = [...new Array(15).keys()];
  // const [emailIds, setEmailIds] = React.useState(props.emailIds);
  // const [deletingId, setDeletingId] = React.useState();
  // const listRef = React.useRef(null);
  // const collapseHandlerRef = React.useRef(null);

  // useEffect(() => {
  // setName(props.name);
  // setEmails(props.emails);
  // setEmailIds(props.emailIds);
  // }, [props]);
  console.log('isPending =', isPending);

  return (
    <div>
      <SummonerListHeader isPending={isPending}></SummonerListHeader>
      {/* {loading ? (
        <div>
          <TestSpinner />
        </div>
      ) : (
        <StyledEmailList ref={listRef}>
          {emailIds.map(id => {
            const isBeingDeleted = id === deletingId;
            const { avatar, title, message } = emails[id % emails.length];
            return (
              <ListItem
                key={id}
                // deleteItem={deleteItem}
                id={id}
                isBeingDeleted={isBeingDeleted}
                avatar={avatar}
                title={title}
                message={message}
                name={name}
                // region={region}
              />
            );
          })}
          <StyledCollapseHandler
            ref={collapseHandlerRef}
            exitDuration={exitDuration}
          />
        </StyledEmailList>
      )} */}
    </div>
  );
};

export default SummonerList;

function SummonerListHeader({ isPending }) {
  return (
    <StyledListItem className='p-4 text-2xl font-bold bg-gray-100'>
      Whatup - {isPending}
      <div className='text-base font-normal'>Data from the last X games.</div>
      {isPending ? <div>Getting Data...</div> : null}
    </StyledListItem>
  );
}
