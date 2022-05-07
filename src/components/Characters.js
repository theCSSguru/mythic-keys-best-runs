import React, { useContext } from 'react';
import { DataContext } from '../context/DataProvider';

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
      // If DESC then make the next click ASC:
      const asc = [...characters].sort(
        (a, b) => b.class.id - a.class.id || b.mythic_rating.rating - a.mythic_rating.rating
      );
      setSortClass('ASC');
      setCharacters(asc);
    }
    if (sortClass === 'ASC') {
      // If ASC then make the next click DESC:
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
      // If DESC then make the next click ASC:
      const asc = [...characters].sort((a, b) => (a.name > b.name ? 1 : -1));
      setSortName('ASC');
      setCharacters(asc);
    }
    if (sortName === 'ASC') {
      // If ASC then make the next click DESC:
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
      // If DESC then make the next click ASC:
      const asc = [...characters].sort((a, b) => (a.mythic_rating.rating > b.mythic_rating.rating ? 1 : -1));
      setSortScore('ASC');
      setCharacters(asc);
    }
    if (sortScore === 'ASC') {
      // If ASC then make the next click DESC:
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
    const filterByClass = [...characters].filter(member => member.class.id === dataClassId);
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
    return <em className='error'> - Error: {error.message}</em>;
  } else if (loading) {
    return <em className='loading'>Loading Characters...</em>;
  } else if (characters.length === 0) {
    return <div className='characters'>There are no level 60's in this guild</div>;
  } else {
    return (
      <div className='characters'>
        <div className='character-list-heading'>
          <div className='character-list-heading-class' data-sorted={sortedClass} data-sort={sortClass}>
            <span className='character-class' data-sorted={sortedClassAll} onClick={sortClasses}>
              Class
            </span>
            <span className='character-dash'>-</span>
            <span className='character-class-all' data-sorted={sortedClassAll} onClick={handleClassShowAll}>
              All
            </span>
          </div>
          <div
            className='character-list-heading-name'
            data-sorted={sortedName}
            data-sort={sortName}
            onClick={sortNames}
          >
            Name
          </div>
          <div className='character-list-heading-best-runs'>Best Runs</div>
          <div
            className='character-list-heading-score'
            data-sorted={sortedScore}
            data-sort={sortScore}
            onClick={sortScores}
          >
            M+ Score
          </div>
        </div>
        <ul className='character-list'>
          {characters.map((member, index) => (
            <li className='character-row' key={index}>
              <div className='character-class'>
                <img
                  src={member.class.icon}
                  alt={`${member.class.name} icon for ${member.name}`}
                  title={`Filter by ${member.class.name}`}
                  data-class-id={member.class.id}
                  onClick={handleClassFilter}
                />
              </div>
              <div className='character-name'>
                <a
                  href={`https://worldofwarcraft.com/en-us/character/us/${member.realm.slug}/${member.name}`}
                  target='_blank'
                  rel='noreferrer'
                  title={`View WoW Amory for ${member.name}`}
                  data-wow-class={member.class.name}
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
                        {...(run.short_name !== undefined
                          ? run.in_time
                            ? { title: run.affix }
                            : { title: `${run.affix} not timed` }
                          : undefined)}
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
                  href={`https://raider.io/characters/us/${member.realm.slug}/${member.name}`}
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
            </li>
          ))}
        </ul>
      </div>
    );
  }
};
