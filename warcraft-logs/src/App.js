import React, { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const characterLevelMax = 60;
  const characterLevelArray = Array.from(Array(characterLevelMax).keys());
  const [characters, setCharacters] = useState([]);
  const [characterLevel, setCharacterLevel] = useState(characterLevelMax);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [guildName, setGuildName] = useState('no-thanks');
  const [serverName, setServerName] = useState('firetree');

  useEffect(() => {
    fetch(
      `https://us.api.blizzard.com/data/wow/guild/${serverName}/${guildName}/roster?namespace=profile-us&locale=en_US&access_token=USU4dJSlxXbxtsnkM6Eyyl4JRkx7rh3kXI`
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
  }, [guildName, serverName]);

  function handleFormSubmit(event) {
    const guildNameValue = document.getElementById('guild-name').value.toLowerCase().replace(/\s/g, '-');
    const serverNameValue = document.getElementById('server-name').value.toLowerCase().replace(/\s/g, '-');
    setGuildName(guildNameValue);
    setServerName(serverNameValue);
    event.preventDefault();
  }

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
        <form onSubmit={handleFormSubmit}>
          <input type='search' name='guild-name' id='guild-name' placeholder='Guild Name' />
          <input type='search' name='server-name' id='server-name' placeholder='Server Name' />
          <button name='search-button' id='search-button'>
            Get
          </button>
        </form>
        <h1>
          <span className={characters.guild.faction.name}>{`<${characters.guild.name}>`}</span>
          <em>- {characters.guild.realm.name}</em>
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
