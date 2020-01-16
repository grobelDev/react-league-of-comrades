import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import { StyledCollapseHandler, StyledListItem } from './styled-components';

const StyledEmailList = styled.ul``;

const messageIds = [...new Array(40).keys()];

const emailsPlaceholder = [
  {
    avatar: 'F',
    title: 'Faker',
    message: 'Challenger 1,098LP',
    id: 1
  },
  {
    avatar: 'T',
    title: 'Tyler1',
    message: 'Master 157 LP',
    id: 2
  },
  {
    avatar: 'D',
    title: 'Doublelift',
    message: 'Grandmaster 463LP',
    id: 3
  },
  {
    avatar: 'H',
    title: 'Huni',
    message: 'Diamond I',
    id: 4
  },
  {
    avatar: 'B',
    title: 'Bjergsen',
    message: 'Master',
    id: 5
  },
  {
    avatar: 'R',
    title: 'Rekkles',
    message: 'Challenger 656LP',
    id: 6
  }
];

const exitDuration = 250;

const Demo = props => {
  const [name, setName] = useState(props.name);
  // console.log(props.name);

  // useEffect(() => {
  //   async function resolveName() {
  //     let name = await props.name;
  //     setName(name);
  //     // console.log(data);
  //   }
  //   resolveName();

  // }, [props.name])

  useEffect(() => {
    function resolveData() {
      let data2 = props.data;
      // console.log(data2);
      setData(data2);
      // console.log(data);
    }
    resolveData();
  }, [props.data]);

  const [data, setData] = useState(null);
  const [emails, setEmails] = useState(emailsPlaceholder);

  if (data && emails === emailsPlaceholder) {
    let newData = data.map((player, index) => {
      let message = `Played together ${player.count} times.`;
      let avatar = player.count;
      let id = index + 1;
      let playerObject = {
        title: player.name,
        message: message,
        avatar: avatar,
        id: id
      };
      return playerObject;
    });

    setEmails(newData);
  }

  // NON-CUSTOM CODE
  const [emailIds, setEmailIds] = React.useState(messageIds);
  const [deletingId, setDeletingId] = React.useState();
  const listRef = React.useRef(null);
  const collapseHandlerRef = React.useRef(null);

  return (
    <div>
      <StyledListItem className='p-4 text-2xl font-bold bg-gray-100'>
        {name} - {data ? 'Data Retrieved' : 'Getting Data'}
        <div className='text-base font-normal'>
          Data from the last {data ? data[0].count : 0} games.
        </div>
      </StyledListItem>
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
            />
          );
        })}
        <StyledCollapseHandler
          ref={collapseHandlerRef}
          exitDuration={exitDuration}
        />
      </StyledEmailList>
    </div>
  );
};

// ARCHIVE

// const deleteItem = React.useCallback(deleteId => {
//   setDeletingId(deleteId);
//   const componentsAfter = [
//     ...listRef.current.querySelectorAll('[data-list-id]')
//   ].filter(component => {
//     const id = component.dataset.listId;
//     if (id <= deleteId) return false;
//     return true;
//   });
//   collapseHandlerRef.current.style.transition = 'none';
//   collapseHandlerRef.current.style.transform = `translateY(71px)`;
//   const fragment = document.createDocumentFragment();
//   componentsAfter.forEach(c => fragment.appendChild(c));
//   collapseHandlerRef.current.appendChild(fragment);

//   requestAnimationFrame(() => {
//     collapseHandlerRef.current.style.transition = '';
//     collapseHandlerRef.current.style.transform = 'translateY(-1px)';
//     setTimeout(() => {
//       componentsAfter.forEach(c => listRef.current.appendChild(c));
//       listRef.current.appendChild(collapseHandlerRef.current);

//       setEmailIds(prevEmails => prevEmails.filter(id => id !== deleteId));
//     }, exitDuration);
//   });
// }, []);

export default Demo;
