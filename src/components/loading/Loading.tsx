export const Loading = ({ text }: LoadingType) => {
  return (
    <div className='loading'>
      <div className='loading-text'>{text}</div>
      <div className='loading-dots-wrap'>
        <div className='loading-dots'></div>
      </div>
    </div>
  );
};

type LoadingType = {
  text?: string;
};
