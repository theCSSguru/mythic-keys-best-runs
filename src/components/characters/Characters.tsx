import { useContext } from 'react';
import { DataContext } from '../../context/DataProvider';
import { Loading } from '../loading/Loading';
import { CharactersHeading } from './CharactersHeading';
import { CharactersBestRuns } from './CharactersBestRuns';
import { urlFriendly } from '../../utils/helpers';
import { IMAGE_PATH_CLASSES, RAIDER_IO_PATH, SORT, WOW_CLASS, WOW_PATH } from '../../utils/constants';

export const Characters = () => {
  const {
    characters,
    setCharacters,
    loading,
    error,
    setSortedClassAll,
    setSortScore,
    setSortedClass,
    setSortedName,
    setSortedScore
  } = useContext(DataContext);

  const handleClassFilter = (e: any) => {
    const dataClassId = parseInt(e.target.getAttribute('data-class-id'));
    const filterByClass = [...characters]
      .filter(a => a.class.id === dataClassId)
      .sort((a, b) => b.mythic_rating.rating - a.mythic_rating.rating);
    setSortedClass(false);
    setSortedName(false);
    setSortedScore(true);
    setSortScore(SORT.DESC);
    setSortedClassAll(true);
    setCharacters(filterByClass);
  };

  if (error) {
    return <em className='error'>Error: {error.message}</em>;
  }
  if (loading) {
    return <Loading text='Loading Characters' />;
  }
  if (characters.length === 0) {
    return <div className='characters'>There are no characters in this guild running the current mythic season.</div>;
  }
  return (
    <div className='characters'>
      <div className='character-list'>
        <CharactersHeading />
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
              <CharactersBestRuns character={member} />
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
};
