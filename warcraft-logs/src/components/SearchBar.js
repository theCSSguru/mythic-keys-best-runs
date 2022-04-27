import React from 'react';
import { urlFriendly } from '../Helpers';

export const SearchBar = ({ setServerName, setGuildName, serverName, guildName, data, loading, loaded, error }) => {
  console.count('searchBarRender: ');

  const maxLevelOnly = data.members.filter(member => member.character.level === 60);

  const handleCharacterSearch = e => {
    e.preventDefault();
    const serverNameValue = e.target.serverName.value;
    const guildNameValue = e.target.guildName.value;
    setServerName(urlFriendly(serverNameValue));
    setGuildName(urlFriendly(guildNameValue));
  };

  const messages = () => {
    if (error) {
      return <em className='error'> - Error: {error.message}</em>;
    } else if (loading) {
      return <em> - Loading...</em>;
    } else if (loaded) {
      return <em> - Loaded {maxLevelOnly.length} Level 60 Characters</em>;
    }
  };

  return (
    <div className='search-bar'>
      <form onSubmit={handleCharacterSearch}>
        <input defaultValue={serverName} type='search' name='serverName' id='serverName' placeholder='Server Name' />
        <input defaultValue={guildName} type='search' name='guildName' id='guildName' placeholder='Guild Name' />
        <button name='search-button' id='search-button'>
          Search
        </button>
      </form>
      <small>
        <em>U.S. Servers Only</em>
        {messages()}
      </small>
    </div>
  );
};
