import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ListItem from './ListItem';
import { StyledCollapseHandler, StyledListItem } from './styled-components';
import { useLocation } from 'react-router-dom';

const exitDuration = 250;

const SummonerListRES = props => {
  const [name, setName] = useState(props.name);
  const [cells, setCells] = useState(props.cells);
  const [count, setCount] = useState(props.count);

  // NON-CUSTOM CODE
  const [cellIds, setCellIds] = React.useState(props.cellIds);
  const [deletingId, setDeletingId] = React.useState();
  const listRef = React.useRef(null);
  const collapseHandlerRef = React.useRef(null);

  return (
    <div className='relative w-full px-6 pt-5 pb-40 mx-auto max-w-screen-xl md:pb-24'>
      <div className='-mx-6'>
        {/* <div className='-mx-6 xl:flex'> */}
        <div className='max-w-2xl px-6 mx-auto text-left xl:text-left md:max-w-3xl'>
          <div>
            <StyledListItem className='p-4 text-2xl font-bold bg-gray-100'>
              {name}
              <div className='text-base font-normal'>
                Data from the last {count} games.
              </div>
            </StyledListItem>

            <ul ref={listRef}>
              {cellIds.map(id => {
                const isBeingDeleted = id === deletingId;
                const { avatar, title, message, profileImage } = cells[
                  id % cells.length
                ];
                return (
                  <ListItem
                    key={id}
                    // deleteItem={deleteItem}
                    profileImage={profileImage}
                    id={id}
                    isBeingDeleted={isBeingDeleted}
                    avatar={avatar}
                    title={title}
                    message={message}
                    name={name}
                    region={props.region}
                  />
                );
              })}
              <StyledCollapseHandler
                ref={collapseHandlerRef}
                exitDuration={exitDuration}
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummonerListRES;

// const StyledEmailList = styled.ul``;

// const TestSpinner = styled.div`
//   border: 16px solid #f3f3f3; /* Light grey */
//   border-top: 16px solid #3498db; /* Blue */
//   border-radius: 50%;
//   width: 120px;
//   height: 120px;
//   animation: spin 2s linear infinite;

//   @keyframes spin {
//     0% {
//       transform: rotate(0deg);
//     }
//     100% {
//       transform: rotate(360deg);
//     }
//   }
// `;
