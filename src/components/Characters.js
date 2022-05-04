import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataProvider';

export const Characters = () => {
  console.count('charactersRender: ');

  const { characters, setCharacters, loading, loaded, error } = useContext(DataContext);

  const [sortName, setSortName] = useState('ASC');
  const [sortScore, setSortScore] = useState('ASC');
  const [sortClass, setSortClass] = useState('ASC');

  const sortNames = () => {
    if (sortName === 'DESC') {
      const sortNamesDesc = [...characters].sort((a, b) => (b.name > a.name ? 1 : -1));
      setSortName('ASC');
      setCharacters(sortNamesDesc);
    }
    if (sortName === 'ASC') {
      const sortNamesAsc = [...characters].sort((a, b) => (b.name < a.name ? 1 : -1));
      setSortName('DESC');
      setCharacters(sortNamesAsc);
    }
  };

  const sortScores = () => {
    if (sortScore === 'DESC') {
      const sortScoresDesc = [...characters].sort((a, b) => (b.mythic_rating.rating > a.mythic_rating.rating ? 1 : -1));
      setSortScore('ASC');
      setCharacters(sortScoresDesc);
    }
    if (sortScore === 'ASC') {
      const sortScoresAsc = [...characters].sort((a, b) => (b.mythic_rating.rating < a.mythic_rating.rating ? 1 : -1));
      setSortScore('DESC');
      setCharacters(sortScoresAsc);
    }
  };

  const sortClasses = () => {
    if (sortClass === 'DESC') {
      const sortClassDesc = [...characters].sort((a, b) => (b.class.id > a.class.id ? 1 : -1));
      setSortClass('ASC');
      setCharacters(sortClassDesc);
    }
    if (sortClass === 'ASC') {
      const sortClassAsc = [...characters].sort((a, b) => (b.class.id < a.class.id ? 1 : -1));
      setSortClass('DESC');
      setCharacters(sortClassAsc);
    }
  };

  if (error) {
    return <em className='error'> - Error: {error.message}</em>;
  } else if (loading) {
    return <em className='loading'>Loading Characters...</em>;
  } else if (loaded) {
    return (
      <div className='characters'>
        <div className='character-list-heading'>
          <div className='character-list-heading-class' onClick={sortClasses}>
            Class
          </div>
          <div className='character-list-heading-name' onClick={sortNames}>
            Name
          </div>
          <div className='character-list-heading-best-runs'>Best Runs</div>
          <div className='character-list-heading-score' onClick={sortScores}>
            M+ Score
          </div>
        </div>
        <ul className='character-list'>
          {characters.map((member, index) => (
            <li className='character-row' key={index}>
              <div className='character-class'>
                <img src={member.class.icon} alt={`${member.class.name} icon for ${member.name}`} />
              </div>
              <div className='character-name'>
                <a
                  href={`https://worldofwarcraft.com/en-us/character/us/${member.realm.slug}/${member.name}`}
                  target='_blank'
                  rel='noreferrer'
                  data-wow-class={member.class.name}
                >
                  {member.name}
                </a>
              </div>
              <div className='character-best-runs'>
                <div className='mythics'>
                  {member.best_runs.map((run, ind) => (
                    <div
                      className='mythic-block'
                      data-short-name={run.short_name}
                      data-affix={run.affix}
                      data-in-time={run.in_time}
                      title={run.affix}
                      key={ind}
                    >
                      <div className='mythic-number'>{run.level}</div>
                      <div className='mythic-name'>{run.short_name}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='character-score'>
                <a
                  href={`https://raider.io/characters/us/${member.realm.slug}/${member.name}`}
                  target='_blank'
                  rel='noreferrer'
                  style={{
                    color: `rgba(${member.mythic_rating.color.r}, ${member.mythic_rating.color.g}, ${member.mythic_rating.color.b}, 1)`
                  }}
                >
                  {Math.trunc(member.mythic_rating.rating)}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <div className='characters'>There are no level 60's in this guild</div>;
  }
};
