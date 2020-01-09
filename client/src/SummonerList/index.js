import React from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import { StyledCollapseHandler } from './styled-components';

const StyledEmailList = styled.ul``;

const messageIds = [...new Array(80).keys()];

const emails = [
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

const Demo = () => {
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
  );
};

export default Demo;
