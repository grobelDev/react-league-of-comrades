import React from 'react';
import styled from 'styled-components';

const SpinnerDiv = styled.div`
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
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

export default function Spinner() {
  return (
    <div className='mx-5 mt-20'>
      <SpinnerDiv></SpinnerDiv>
    </div>
  );
}
