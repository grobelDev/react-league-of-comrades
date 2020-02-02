import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import { StyledCollapseHandler, StyledListItem } from './styled-components';
import { useLocation } from 'react-router-dom';

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

const Demo = props => {
  const [name, setName] = useState(props.name);
  const [emails, setEmails] = useState(props.emails);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  // NON-CUSTOM CODE
  // const messageIds = [...new Array(15).keys()];
  const [emailIds, setEmailIds] = React.useState(props.emailIds);
  const [deletingId, setDeletingId] = React.useState();
  const listRef = React.useRef(null);
  const collapseHandlerRef = React.useRef(null);

  useEffect(() => {
    setName(props.name);
    setEmails(props.emails);
    setEmailIds(props.emailIds);
  }, [props]);

  return (
    <div>
      <StyledListItem className='p-4 text-2xl font-bold bg-gray-100'>
        {name}
        <div className='text-base font-normal'>
          Data from the last {data ? data[0].count : 0} games.
        </div>
      </StyledListItem>
      {loading ? (
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
      )}
    </div>
  );
};

export default Demo;

// ARCHIVE

// const emailsPlaceholder = [
//   {
//     avatar: 'F',
//     title: 'Faker',
//     message: 'Challenger 1,098LP',
//     id: 1
//   },
//   {
//     avatar: 'T',
//     title: 'Tyler1',
//     message: 'Master 157 LP',
//     id: 2
//   },
//   {
//     avatar: 'D',
//     title: 'Doublelift',
//     message: 'Grandmaster 463LP',
//     id: 3
//   },
//   {
//     avatar: 'H',
//     title: 'Huni',
//     message: 'Diamond I',
//     id: 4
//   },
//   {
//     avatar: 'B',
//     title: 'Bjergsen',
//     message: 'Master',
//     id: 5
//   },
//   {
//     avatar: 'R',
//     title: 'Rekkles',
//     message: 'Challenger 656LP',
//     id: 6
//   }
// ];
