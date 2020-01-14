import React, { useState } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import { StyledCollapseHandler, StyledListItem } from './styled-components';

const StyledEmailList = styled.ul``;

const messageIds = [...new Array(80).keys()];

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
  const [emails, setEmails] = useState(emailsPlaceholder);
  const [response, setResponse] = useState(null);

  let url = 'https://server-nch7pipeyq-uc.a.run.app';
  let testUrl = 'http://localhost:8080';

  async function pingServer() {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        setResponse(myJson);
      });
  }

  if (!response) {
    pingServer();
  } else if (emails === emailsPlaceholder) {
    let emails2 = [];

    response.forEach((player, index) => {
      let message = `Played together ${player.frequency} times.`;
      let avatar = player.name[0];
      let id = index + 1;

      let playerObject = {
        title: player.name,
        message: message,
        avatar: avatar,
        id: id
      };
      emails2.push(playerObject);
    });
    setEmails(emails2);
  }

  // NON-CUSTOM CODE
  const [emailIds, setEmailIds] = React.useState(messageIds);
  const [deletingId, setDeletingId] = React.useState();
  const listRef = React.useRef(null);
  const collapseHandlerRef = React.useRef(null);

  const deleteItem = React.useCallback(deleteId => {
    setDeletingId(deleteId);
    const componentsAfter = [
      ...listRef.current.querySelectorAll('[data-list-id]')
    ].filter(component => {
      const id = component.dataset.listId;
      if (id <= deleteId) return false;
      return true;
    });
    collapseHandlerRef.current.style.transition = 'none';
    collapseHandlerRef.current.style.transform = `translateY(71px)`;
    const fragment = document.createDocumentFragment();
    componentsAfter.forEach(c => fragment.appendChild(c));
    collapseHandlerRef.current.appendChild(fragment);

    requestAnimationFrame(() => {
      collapseHandlerRef.current.style.transition = '';
      collapseHandlerRef.current.style.transform = 'translateY(-1px)';
      setTimeout(() => {
        componentsAfter.forEach(c => listRef.current.appendChild(c));
        listRef.current.appendChild(collapseHandlerRef.current);

        setEmailIds(prevEmails => prevEmails.filter(id => id !== deleteId));
      }, exitDuration);
    });
  }, []);

  return (
    <div>
      <StyledListItem className='p-4 text-2xl font-bold'>
        Doublelift - {response ? 'Data Retrieved' : 'Getting Data'}
        <div className='text-base font-normal'>
          Data from the last {response ? 3 : 0} games.
        </div>
      </StyledListItem>
      <StyledEmailList ref={listRef}>
        {emailIds.map(id => {
          const isBeingDeleted = id === deletingId;
          const { avatar, title, message } = emails[id % emails.length];
          return (
            <ListItem
              key={id}
              deleteItem={deleteItem}
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

export default Demo;
