import React, { useContext, useState } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import { DataContext } from '../context/DataProvider';
import { Loading } from './Loading';
import RealmListJson from '../data/RealmList.json';
import { DEFAULT_GUILD } from '../utils/constants';
import { urlFriendly } from '../utils/helpers';

export const SearchBar = () => {
  const { guild, setGuild, characters, loading, loaded, error } = useContext(DataContext);
  const [inputGuild, setInputGuild] = useState(DEFAULT_GUILD.name);
  const [inputRealm, setInputRealm] = useState(DEFAULT_GUILD.realm.name);

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
        <Button type='submit' variant='contained' disabled>
          <Loading />
        </Button>
      );
    } else {
      return (
        <Button type='submit' variant='contained'>
          Search
        </Button>
      );
    }
  };

  const messages = () => {
    if (error) {
      return <em className='error'> - Error: {error.message}</em>;
    } else if (loading) {
      return <Loading text='- Loading Characters' />;
    } else if (loaded) {
      return <em> - Loaded {characters.length} Level 70 Characters</em>;
    }
  };

  return (
    <div className='search-bar'>
      <form onSubmit={handleCharacterSearch}>
        <Autocomplete
          disablePortal
          id='realmName'
          options={RealmListJson && RealmListJson.sort((a, b) => a.name.localeCompare(b.name)).map(a => a.name)}
          sx={{ width: 300 }}
          value={inputRealm}
          onChange={(event, newValue) => {
            setInputRealm(newValue);
          }}
          renderInput={params => <TextField {...params} label='Realm Name' />}
        />
        <TextField
          type='search'
          name='guildName'
          id='guildName'
          label='Guild Name'
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
