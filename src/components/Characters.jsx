import React, { useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import { Loading } from './Loading';
import { IMAGE_PATH_CLASSES, IMAGE_PATH_DUNGEONS, RAIDER_IO_PATH, WOW_CLASS, WOW_PATH } from '../utils/constants';
import { urlFriendly } from '../utils/helpers';

export const Characters = () => {
  const {
    characters,
    setCharacters,
    initialCharacters,
    loading,
    error,
    sortClass,
    sortName,
    sortScore,
    sortedClass,
    sortedClassAll,
    sortedName,
    sortedScore,
    setSortClass,
    setSortedClassAll,
    setSortName,
    setSortScore,
    setSortedClass,
    setSortedName,
    setSortedScore
  } = useContext(DataContext);

  const sortClasses = () => {
    if (sortClass === 'DESC' || sortClass === 'DEFAULT') {
      const asc = [...characters].sort(
        (a, b) => b.class.id - a.class.id || b.mythic_rating.rating - a.mythic_rating.rating
      );
      setSortClass('ASC');
      setCharacters(asc);
    }
    if (sortClass === 'ASC') {
      const desc = [...characters].sort(
        (a, b) => a.class.id - b.class.id || b.mythic_rating.rating - a.mythic_rating.rating
      );
      setSortClass('DESC');
      setCharacters(desc);
    }
    setSortedClass(true);
    setSortedName(false);
    setSortedScore(false);
    setSortName('DEFAULT');
    setSortScore('ASC');
  };

  const sortNames = () => {
    if (sortName === 'DESC' || sortName === 'DEFAULT') {
      const asc = [...characters].sort((a, b) => (a.name > b.name ? 1 : -1));
      setSortName('ASC');
      setCharacters(asc);
    }
    if (sortName === 'ASC') {
      const desc = [...characters].sort((a, b) => (a.name < b.name ? 1 : -1));
      setSortName('DESC');
      setCharacters(desc);
    }
    setSortedClass(false);
    setSortedName(true);
    setSortedScore(false);
    setSortClass('DEFAULT');
    setSortScore('ASC');
  };

  const sortScores = () => {
    if (sortScore === 'DESC') {
      const asc = [...characters].sort((a, b) => (a.mythic_rating.rating > b.mythic_rating.rating ? 1 : -1));
      setSortScore('ASC');
      setCharacters(asc);
    }
    if (sortScore === 'ASC') {
      const desc = [...characters].sort((a, b) => (a.mythic_rating.rating < b.mythic_rating.rating ? 1 : -1));
      setSortScore('DESC');
      setCharacters(desc);
    }
    setSortedClass(false);
    setSortedName(false);
    setSortedScore(true);
    setSortClass('DEFAULT');
    setSortName('DEFAULT');
  };

  const handleClassFilter = e => {
    const dataClassId = parseInt(e.target.getAttribute('data-class-id'));
    const filterByClass = [...characters]
      .filter(a => a.class.id === dataClassId)
      .sort((a, b) => b.mythic_rating.rating - a.mythic_rating.rating);
    setSortedClass(false);
    setSortedName(false);
    setSortedScore(true);
    setSortScore('DESC');
    setSortedClassAll(true);
    setCharacters(filterByClass);
  };

  const handleClassShowAll = e => {
    setSortedClass(false);
    setSortedName(false);
    setSortedScore(true);
    setSortedClassAll(false);
    setCharacters(initialCharacters);
  };

  if (error) {
    return <em className='error'>Error: {error.message}</em>;
  } else if (loading) {
    return <Loading text='Loading Characters' />;
  } else if (characters.length === 0) {
    return <div className='characters'>There are no characters in this guild running the current mythic season.</div>;
  } else {
    return (
      <div className='characters'>
        <div className='character-list'>
          <div className='character-list-heading'>
            <div className='character-list-heading-class-wrap' data-sorted={sortedClass} data-sort={sortClass}>
              <button
                className='character-list-heading-class'
                data-sorted={sortedClassAll}
                onClick={sortClasses}
                disabled={sortedClassAll ? 'disabled' : null}
              >
                Class
              </button>
              <span className='character-list-heading-class-dash'>-</span>
              <button
                className='character-list-heading-class-all'
                data-sorted={sortedClassAll}
                onClick={handleClassShowAll}
                disabled={sortedClassAll ? null : 'disabled'}
              >
                All
              </button>
            </div>
            <button
              className='character-list-heading-name'
              data-sorted={sortedName}
              data-sort={sortName}
              onClick={sortNames}
            >
              Name
            </button>
            <div className='character-list-heading-best-runs'>Best Runs</div>
            <button
              className='character-list-heading-score'
              data-sorted={sortedScore}
              data-sort={sortScore}
              onClick={sortScores}
            >
              M+ Score
            </button>
          </div>
          {characters.map((member, index) => (
            <div className='character-row' key={index}>
              <button
                className='character-class-icon'
                title={`Filter by ${member.class.name}`}
                data-class-id={member.class.id}
                onClick={handleClassFilter}
                style={{
                  backgroundImage: `url(${IMAGE_PATH_CLASSES}${urlFriendly(
                    WOW_CLASS.find(a => a.id === member.class.id).class
                  )}.jpg)`
                }}
              >
                <span>{member.class.name}</span>
              </button>
              <div className='character-name'>
                <a
                  href={`${WOW_PATH}${member.realm.slug}/${member.name}`}
                  target='_blank'
                  rel='noreferrer'
                  title={`View WoW Amory for ${member.name}`}
                  style={{ color: WOW_CLASS.find(a => a.id === member.class.id).color }}
                >
                  {member.name}
                </a>
              </div>
              <div className='character-best-runs'>
                <div className='mythics'>
                  {member.best_runs.map((run, ind) =>
                    run !== 'null' ? (
                      <div
                        className='mythic-block'
                        data-short-name={run.short_name}
                        data-affix={run.affix}
                        data-in-time={run.in_time}
                        title={`${run.name} - ${run.affix} ${run.in_time ? '' : '- NOT TIMED'}`}
                        style={{
                          backgroundImage: `url(${IMAGE_PATH_DUNGEONS}${run.short_name}.jpg)`
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
              </div>
              <div className='character-score'>
                <a
                  href={`${RAIDER_IO_PATH}${member.realm.slug}/${member.name}`}
                  target='_blank'
                  rel='noreferrer'
                  title={`View Raider.io for ${member.name}`}
                  style={{
                    color: `rgba(${member.mythic_rating.color.r}, ${member.mythic_rating.color.g}, ${member.mythic_rating.color.b}, 1)`
                  }}
                >
                  {member.mythic_rating.rating.toFixed(0)}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};
