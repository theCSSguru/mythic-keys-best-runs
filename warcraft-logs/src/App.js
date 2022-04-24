import React, { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const characterLevelMax = 60;
  const characterLevelArray = Array.from(Array(characterLevelMax).keys());
  const characterClassArray = Array.from(Array(12).keys());
  const [characters, setCharacters] = useState([]);
  const [characterLevel, setCharacterLevel] = useState(characterLevelMax);
  //const [characterClass, setCharacterClass] = useState(null);

  // const characterLevelMax = 60;
  // const characterLevelArray = Array.from(Array(characterLevelMax).keys());
  // const characterClassArray = Array.from(Array(12).keys());
  // const [characters, setCharacters] = useState([]);
  // const [characterLevel, setCharacterLevel] = useState(characterLevelMax);
  // const [characterClass, setCharacterClass] = useState(null);
  // const characterFilterLevel = characters.members.filter(member => member.character.level === characterLevel);
  // const characterFilterClass = characters.members.filter(
  //   member => member.character.playable_class.id === characterClass
  // );
  // const [characterFilter, setCharacterFilter] = useState(characterFilterLevel);
  // const characterCount = characterFilter.length;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [guildName, setGuildName] = useState('no-thanks');
  const [serverName, setServerName] = useState('firetree');

  useEffect(() => {
    fetch(
      `https://us.api.blizzard.com/data/wow/guild/${serverName}/${guildName}/roster?namespace=profile-us&locale=en_US&access_token=${process.env.REACT_APP_API_KEY}`
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

  function handleGuildSearch(event) {
    const guildNameValue = document.getElementById('guild-name').value.toLowerCase().replace(/\s/g, '-');
    const serverNameValue = document.getElementById('server-name').value.toLowerCase().replace(/\s/g, '-');
    setGuildName(guildNameValue);
    setServerName(serverNameValue);
    event.preventDefault();
  }

  function handleCharacterLevel(event) {
    setCharacterLevel(parseInt(event.target.value));
  }

  // function handleCharacterClass(event) {
  //   setCharacterClass(parseInt(event.target.value));
  // }

  // function handleCharacterLevel(event) {
  //   setCharacterLevel(parseInt(event.target.value));
  //   setCharacterFilter(characterFilterLevel);
  // }

  // function handleCharacterClass(event) {
  //   setCharacterClass(parseInt(event.target.value));
  //   setCharacterFilter(characterFilterClass);
  // }

  function wowClassNames(id) {
    switch (id) {
      case 1:
        return 'Warrior';
      case 2:
        return 'Paladin';
      case 3:
        return 'Hunter';
      case 4:
        return 'Rogue';
      case 5:
        return 'Priest';
      case 6:
        return 'Death Knight';
      case 7:
        return 'Shaman';
      case 8:
        return 'Mage';
      case 9:
        return 'Warlock';
      case 10:
        return 'Monk';
      case 11:
        return 'Druid';
      case 12:
        return 'Demon Hunter';
      default:
        return null;
    }
  }

  if (error) {
    return <div className='wrapper'>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className='wrapper'>Loading...</div>;
  } else {
    const characterLevelFilter = characters.members.filter(member => member.character.level === characterLevel);
    // const characterClassFilter = characters.members.filter(
    //   member => member.character.playable_class.id === characterClass
    // );
    const characterCount = characterLevelFilter.length;
    return (
      <div className={`wrapper ${characters.guild.faction.name}`}>
        <form onSubmit={handleGuildSearch}>
          <input type='search' name='guild-name' id='guild-name' placeholder='Guild Name' />
          <input type='search' name='server-name' id='server-name' placeholder='Server Name' />
          <button name='search-button' id='search-button'>
            Search
          </button>
        </form>
        <small>U.S. Servers Only</small>
        <h1>
          <span className={characters.guild.faction.name}>{`<${characters.guild.name}>`}</span>
          <em>- {characters.guild.realm.name}</em>
        </h1>
        <div className='selectors'>
          <div className='selector'>
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
          </div>
          <div className='selector'>
            <label htmlFor='character-class'>Select Class</label>
            {/* <select name='character-class' id='character-class' value='DEFAULT' onChange={handleCharacterClass}>
              <option value='DEFAULT' disabled>
                Select Class
              </option>
              {characterClassArray.map((item, i) => (
                <option key={i} value={item + 1}>
                  {wowClassNames(item + 1)}
                </option>
              ))}
            </select> */}
          </div>
        </div>
        <h2>
          <em>{characterCount}</em> Total Characters at <span>Level {characterLevel}</span>
        </h2>
        <ul>
          {characterLevelFilter.map(item => (
            <li key={item.character.id}>
              <em>{characterLevel}:</em>{' '}
              <a
                href={`https://worldofwarcraft.com/en-us/character/us/${characters.guild.realm.slug}/${item.character.name}`}
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
  }
}

export default App;
