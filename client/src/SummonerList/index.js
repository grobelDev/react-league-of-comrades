import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import { StyledCollapseHandler, StyledListItem } from './styled-components';

const StyledEmailList = styled.ul``;

const messageIds = [...new Array(15).keys()];

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
  const [data, setData] = useState(null);
  const [emails, setEmails] = useState(emailsPlaceholder);

  // NON-CUSTOM CODE
  const [emailIds, setEmailIds] = React.useState(messageIds);
  const [deletingId, setDeletingId] = React.useState();
  const listRef = React.useRef(null);
  const collapseHandlerRef = React.useRef(null);

  useEffect(() => {
    setName(props.name);
    setData(props.data);
  }, [props]);

  useEffect(() => {
    function updateData() {
      if (!data || !name) {
        setEmails(emailsPlaceholder);
        setEmailIds(messageIds);
        return;
      }

      let formattedName = data.find(
        player => player.name.toLowerCase() === name.toLowerCase()
      );

      if (!formattedName) {
        return;
      }

      let filteredData = data.filter(
        player => player.name !== formattedName.name
      );

      let newData = filteredData.map((player, index) => {
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

      // update name formatting
      setName(formattedName.name);

      // update data
      setEmailIds([...new Array(newData.length).keys()]);
      setEmails(newData);
    }

    updateData();
  }, [data]);

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
    </div>
  );
};

export default Demo;
