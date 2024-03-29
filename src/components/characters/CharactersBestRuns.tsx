import { useContext } from 'react';
import { DataContext } from '../../context/DataProvider';
import { IMAGE_PATH_DUNGEONS } from '../../utils/constants';

export const CharactersBestRuns = (character: any) => {
  const { season } = useContext(DataContext);

  return (
    <div className='mythics'>
      {character?.character?.best_runs?.map((run: any, ind: number) =>
        run !== 'null' ? (
          <div
            className='mythic-block'
            data-short-name={run.short_name}
            data-affix={run.affix}
            data-in-time={run.in_time}
            title={`${run.name} - ${run.affix} ${run.in_time ? '' : '- NOT TIMED'}`}
            style={{
              backgroundImage: `url(${IMAGE_PATH_DUNGEONS}${season}/${run.short_name}.jpg)`
            }}
            key={ind}
          >
            <div className='mythic-number'>{run.level}</div>
            <div className='mythic-name'>{run.short_name}</div>
          </div>
        ) : (
          <div className='mythic-block null' key={ind}></div>
        )
      )}
    </div>
  );
};
