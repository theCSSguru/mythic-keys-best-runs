import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataProvider';
import { urlFriendly } from '../Helpers';
import { Loading } from './Loading';

export const SearchBar = () => {
  const { guild, setGuild, characters, loading, loaded, error, setError } = useContext(DataContext);
  const [inputRealm, setInputRealm] = useState(guild.realm.name);
  const [inputGuild, setInputGuild] = useState(guild.name);

  const handleCharacterSearch = e => {
    e.preventDefault();
    const realmNameValue = urlFriendly(e.target.realmName.value);
    const guildNameValue = urlFriendly(e.target.guildName.value);
    if (realmNameValue.length === 0 && guildNameValue.length === 0) {
      setError({ message: 'Please enter a Realm Name and a Guild Name' });
    } else if (realmNameValue.length === 0) {
      setError({ message: 'Please enter a Realm Name' });
    } else if (guildNameValue.length === 0) {
      setError({ message: 'Please enter a Guild Name' });
    } else {
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
    }
  };

  const onInputRealm = e => {
    const { value } = e.target;
    const re = /^[A-Za-z ']*$/;
    if (value === '' || re.test(value)) {
      setInputRealm(value);
    }
  };

  const onInputGuild = e => {
    const { value } = e.target;
    const re = /^[A-Za-z ']*$/;
    if (value === '' || re.test(value)) {
      setInputGuild(value);
    }
  };

  const searchButtonText = () => {
    if (loading) {
      return <Loading />;
    } else {
      return 'Search';
    }
  };

  const messages = () => {
    if (error) {
      return <em className='error'> - Error: {error.message}</em>;
    } else if (loading) {
      return <Loading text='- Loading Characters' />;
    } else if (loaded) {
      return <em> - Loaded {characters.length} Level 60 Characters</em>;
    }
  };

  return (
    <div className='search-bar'>
      <form onSubmit={handleCharacterSearch}>
        <input
          type='search'
          name='realmName'
          id='realmName'
          placeholder='Realm Name'
          value={inputRealm}
          onChange={onInputRealm}
        />
        <input
          type='search'
          name='guildName'
          id='guildName'
          placeholder='Guild Name'
          value={inputGuild}
          onChange={onInputGuild}
        />
        <button name='search-button' id='search-button'>
          {searchButtonText()}
        </button>
      </form>
      <small>
        <em>U.S. Servers Only</em>
        {messages()}
      </small>
    </div>
  );
};
