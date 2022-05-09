import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataProvider';
import { urlFriendly } from '../Helpers';
import { Loading } from './Loading';

export const SearchBar = () => {
  const { guild, setGuild, characters, loading, loaded, error, setError } = useContext(DataContext);
  const [inputRealm, setInputRealm] = useState('Firetree');
  const [inputGuild, setInputGuild] = useState('No Thanks');

  const handleCharacterSearch = e => {
    e.preventDefault();
    setGuild({
      name: inputGuild,
      slug: urlFriendly(inputGuild),
      realm: {
        name: inputRealm,
        slug: urlFriendly(inputRealm)
      },
      faction: {
        name: guild.faction.name
      }
    });
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

  const searchButton = () => {
    if (loading) {
      return (
        <button type='submit' name='search-button' id='search-button' disabled>
          <Loading />
        </button>
      );
    } else {
      return (
        <button type='submit' name='search-button' id='search-button'>
          Search
        </button>
      );
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
        {searchButton()}
      </form>
      <small>
        <em>U.S. Servers Only</em>
        {messages()}
      </small>
    </div>
  );
};
