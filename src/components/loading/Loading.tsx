export const Loading = ({ text }) => {
  return (
    <div className='loading'>
      <div className='loading-text'>{text}</div>
      <div className='loading-dots-wrap'>
        <div className='loading-dots'></div>
      </div>
    </div>
  );
};
