import React, { useRef, useEffect, useState } from 'react';
import {
  StyledAction,
  StyledListItem,
  StyledListItemContainer,
  StyledEmail,
  StyledAvatar
} from './styled-components';
// import { animated } from 'react-spring';
import useVelocityTrackedSpring from '../useVelocityTrackedSpring.js';
import { useDrag } from 'react-use-gesture';
// import {
//   rubberBandIfOutOfBounds,
//   findNearestNumberInArray,
//   projection,
//   range
// } from '../utilities';
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom';
import FadeIn from 'react-fade-in';

const actionWidth = 100;
const threshold = 15;

const spring = {
  tension: 439,
  friction: 40
};

const actionsOpen = -actionWidth * 2;

const ListItem = ({
  avatar,
  title,
  message,
  deleteItem,
  id,
  isBeingDeleted,
  name,
  profileImage
}) => {
  const itemRef = useRef(null);
  const stops = useRef(null);
  const [willTransform, setWillTransform] = useState(null);

  useEffect(() => {
    stops.current = [0, actionsOpen, -itemRef.current.clientWidth];
  }, []);

  const [{ x }, set] = useVelocityTrackedSpring(() => ({
    x: 0
  }));

  const bind = useDrag(
    ({
      vxvy: [velocityX],
      movement: [movementX, movementY],
      delta: [deltaX],
      last,
      memo,
      cancel
    }) => {
      if (!memo) {
        const isIntentionalGesture =
          Math.abs(movementX) > threshold &&
          Math.abs(movementX) > Math.abs(movementY);

        if (!isIntentionalGesture) {
          if (!willTransform) setWillTransform(true);
          return;
        }
        memo = x.value - movementX;
      }

      return memo;
    }
  );

  return (
    <StyledListItemContainer
      ref={itemRef}
      onTouchStart={bind().onTouchStart}
      willTransform={willTransform}
      isBeingDeleted={isBeingDeleted}
      data-list-id={id}
    >
      <StyledListItem
      // as={animated.div}
      // style={{
      //   transform: x.interpolate(x => `translateX(${x}px)`)
      // }}
      >
        <StyledEmail>
          {/* <StyledAvatar>{avatar}</StyledAvatar> */}
          <StyledAvatar>
            <Link to={`./${title}`}>
              <img
                src={profileImage}
                className='rounded-full'
                alt='profile image'
              ></img>
            </Link>
          </StyledAvatar>
          <div>
            <Link to={`./${name}/${title}`}>
              <h3>{title}</h3>
            </Link>
            <div>{message}</div>
            {/* <Link to={`./${title}`}>{title} Profile</Link> */}
          </div>
        </StyledEmail>
      </StyledListItem>
    </StyledListItemContainer>
  );
};

export default React.memo(ListItem);

// ARCHIVE
{
  /* <StyledAction
        archiveAction
        width={actionWidth}
        as={animated.div}
        style={{
          transform: x.interpolate(x => `translateX(${x}px) scaleY(0.999)`)
        }}
      >
        Archive
      </StyledAction>
      <StyledAction
        width={actionWidth}
        as={animated.div}
        style={{
          transform: x.interpolate(x => {
            const { scaleX, translateX } = calculateDeleteButtonTransforms(x);
            return `translateX(${translateX}px) scaleX(${scaleX})`;
          })
        }}
      >
        <animated.div
          style={{
            transform: x.interpolate(x => {
              const { scaleX } = calculateDeleteButtonTransforms(x);
              return `scaleX(${1 / scaleX})`;
            })
          }}
        >
          Delete
        </animated.div>
      </StyledAction> */
}
