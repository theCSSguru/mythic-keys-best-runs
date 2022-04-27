import React, { useContext } from 'react';
import { CharacterContext } from '../contexts/CharacterProvider';
import { urlFriendly, wowClassNames } from '../Helpers';

export const Characters = () => {
  console.count('charactersRender: ');

  const { data, serverName } = useContext(CharacterContext);

  const maxLevelOnly = data.members.filter(member => member.character.level === 60);

  if (maxLevelOnly.length > 0) {
    return (
      <div className='characters'>
        <ul>
          {maxLevelOnly.map(item => (
            <li key={item.character.id}>
              <a
                href={`https://worldofwarcraft.com/en-us/character/us/${urlFriendly(serverName)}/${
                  item.character.name
                }`}
                target='_blank'
                rel='noreferrer'
                data-wow-class={wowClassNames(item.character.playable_class.id)}
              >
                {item.character.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <div className='characters'>There are no level 60's in this guild</div>;
  }
};
