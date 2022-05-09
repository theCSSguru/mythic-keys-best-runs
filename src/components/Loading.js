import React from 'react';

export const Loading = ({ text }) => {
  return (
    <div className='loading'>
      <div className='loading-text'>{text}</div>
      <div class='loading-dots-wrap'>
        <div class='loading-dots'></div>
      </div>
    </div>
  );
};
