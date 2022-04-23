import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const characterLevelMax = 60;
  const characterLevelArray = Array.from(Array(characterLevelMax).keys());
  const [characters, setCharacters] = useState([]);
  const [characterLevel, setCharacterLevel] = useState(characterLevelMax);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(
      'https://us.api.blizzard.com/data/wow/guild/firetree/no-thanks/roster?namespace=profile-us&locale=en_US&access_token=USU4dJSlxXbxtsnkM6Eyyl4JRkx7rh3kXI'
    )
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setCharacters(result);
        },
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  function handleCharacterLevel(event) {
    setCharacterLevel(parseInt(event.target.value));
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    const characterLevelFilter = characters.members.filter(member => member.character.level === characterLevel);
    const characterCount = characterLevelFilter.length;
    return (
      <div className='wrapper'>
        <h1>
          <span>
            {'<'}No Thanks{'>'}
          </span>{' '}
          - Guild
        </h1>
        <label htmlFor='character-level'>Select Character Level</label>
        <select name='character-level' id='character-level' onChange={handleCharacterLevel}>
          {characterLevelArray
            .sort((a, b) => (a - b ? -1 : 1))
            .map((item, i) => (
              <option key={i} value={item + 1}>
                {item + 1}
              </option>
            ))}
        </select>
        <h2>
          <em>{characterCount}</em> Total Characters at <span>Level {characterLevel}</span>
        </h2>
        <ul>
          {characterLevelFilter.map(item => (
            <li key={item.character.id}>
              <em>{characterLevel}:</em>{' '}
              <a
                href={`https://worldofwarcraft.com/en-us/character/us/firetree/${item.character.name}`}
                target='_blank'
                rel='noreferrer'
                data-wow-class={item.character.playable_class.id}
              >
                {item.character.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
