import React, { useContext, useState } from 'react';
import { CharacterContext } from '../contexts/CharacterProvider';
import { wowClassNames } from '../Helpers';

export const FilterBar = () => {
  console.count('filterBarRender: ');

  const { data, characters, setCharacters } = useContext(CharacterContext);

  const characterClassArray = Array.from(Array(12).keys());
  const [characterClassId, setCharacterClassId] = useState('DEFAULT');

  const filterCharacterClass = e => {
    setCharacterClassId(parseInt(e.target.value));
    setCharacters(characters.filter(member => member.character.playable_class.id === parseInt(e.target.value)));
  };

  return (
    <div className='filter-bar'>
      <div className='heading'>
        <h1>
          <span className={data.guild.faction.name}>{`<${data.guild.name}>`}</span>
          <em>- {data.guild.realm.name}</em>
        </h1>
      </div>
      <div className='selectors'>
        <div className='selector'>
          <label htmlFor='characterClass'>Select Class</label>
          <select
            name='characterClass'
            id='characterClass'
            defaultValue={characterClassId}
            onChange={filterCharacterClass}
          >
            <option value='DEFAULT' disabled>
              Select Class
            </option>
            {characterClassArray.map((item, i) => (
              <option key={i} value={item + 1}>
                {wowClassNames(item + 1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
