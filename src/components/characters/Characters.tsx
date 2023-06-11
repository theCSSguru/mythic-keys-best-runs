import { useContext } from 'react';
import { DataContext } from '../../context/DataProvider';
import { Loading } from '../loading/Loading';
import { CharactersHeading } from './CharactersHeading';
import { CharactersBestRuns } from './CharactersBestRuns';
import { urlFriendly } from '../../utils/helpers';
import { IMAGE_PATH_CLASSES, RAIDER_IO_PATH, WOW_CLASS, WOW_PATH } from '../../utils/constants';

export const Characters = () => {
  const { characters, setCharacters, loading, error, setSortedClassAll } = useContext(DataContext);

  const handleClassFilter = (id: number | undefined) => {
    if (characters) {
      const filterByClass = [...characters].filter(a => a?.class?.id === id);
      setSortedClassAll(true);
      setCharacters(filterByClass);
    }
  };

  if (error?.message) {
    return <em className='error'>Error: {error.message}</em>;
  }
  if (loading) {
    return <Loading text='Loading Characters' />;
  }
  if (characters?.length === 0) {
    return <div className='characters'>There are no characters in this guild running the current mythic season.</div>;
  }
  return (
    <div className='characters'>
      <div className='character-list'>
        <CharactersHeading />
        {characters?.map((member, index) => {
          const WowClassId = WOW_CLASS.find(a => a.id === member?.class?.id);
          return (
            <div className='character-row' key={index}>
              <button
                className='character-class-icon'
                title={`Filter by ${member?.class?.name}`}
                onClick={() => handleClassFilter(member?.class?.id)}
                style={{
                  backgroundImage: `url(${IMAGE_PATH_CLASSES}${urlFriendly(WowClassId?.class)}.jpg)`
                }}
              >
                <span>{member?.class?.name}</span>
              </button>
              <div className='character-name'>
                <a
                  href={`${WOW_PATH}${member?.realm?.slug}/${member.name}`}
                  target='_blank'
                  rel='noreferrer'
                  title={`View WoW Amory for ${member.name}`}
                  style={{ color: WowClassId?.color }}
                >
                  {member.name}
                </a>
              </div>
              <div className='character-best-runs'>
                <CharactersBestRuns character={member} />
              </div>
              <div className='character-score'>
                <a
                  href={`${RAIDER_IO_PATH}${member?.realm?.slug}/${member.name}`}
                  target='_blank'
                  rel='noreferrer'
                  title={`View Raider.io for ${member.name}`}
                  style={{
                    color: `rgba(${member?.mythic_rating?.color?.r}, ${member?.mythic_rating?.color?.g}, ${member?.mythic_rating?.color?.b}, 1)`
                  }}
                >
                  {member?.mythic_rating?.rating?.toFixed(0)}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
