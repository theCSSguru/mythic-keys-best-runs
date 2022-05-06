import React, { useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import { urlFriendly } from '../Helpers';

export const SearchBar = () => {
  const { guild, setGuild, characters, loading, loaded, error } = useContext(DataContext);

  const handleCharacterSearch = e => {
    e.preventDefault();
    const realmNameValue = urlFriendly(e.target.realmName.value);
    const guildNameValue = urlFriendly(e.target.guildName.value);
    setGuild({
      name: guildNameValue,
      slug: guildNameValue,
      realm: {
        name: realmNameValue,
        slug: realmNameValue
      },
      faction: {
        name: guild.faction.name
      }
    });
  };

  const messages = () => {
    if (error) {
      return <em className='error'> - Error: {error.message}</em>;
    } else if (loading) {
      return <em className='loading'> - Loading...</em>;
    } else if (loaded) {
      return <em> - Loaded {characters.length} Level 60 Characters</em>;
    }
  };

  return (
    <div className='search-bar'>
      <form onSubmit={handleCharacterSearch}>
        <input
          defaultValue={guild.realm.name}
          type='search'
          name='realmName'
          id='realmName'
          placeholder='Server Name'
        />
        <input defaultValue={guild.name} type='search' name='guildName' id='guildName' placeholder='Guild Name' />
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
