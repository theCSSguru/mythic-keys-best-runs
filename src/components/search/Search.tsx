import { useContext, useState } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import { DataContext } from '../../context/DataProvider';
import { Loading } from '../loading/Loading';
import { urlFriendly } from '../../utils/helpers';
import { DEFAULT_GUILD, MAX_LEVEL, SEASONS } from '../../utils/constants';
import realms from '../../data/realms.json';

export const Search = () => {
  const { guild, setGuild, characters, season, setSeason, maxLevel, setMaxLevel, loading, loaded, error } =
    useContext(DataContext);
  const [inputGuild, setInputGuild] = useState<string>(DEFAULT_GUILD.name);
  const [inputRealm, setInputRealm] = useState<string>(DEFAULT_GUILD.realm.name);

  const handleCharacterSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setGuild({
      name: inputGuild,
      slug: urlFriendly(inputGuild),
      realm: {
        name: inputRealm,
        slug: urlFriendly(inputRealm)
      },
      faction: {
        name: guild?.faction?.name
      }
    });
  };

  const onInputGuild = (e: { target: { value: string } }) => {
    const { value } = e.target;
    const re = /^[A-Za-z ']*$/;
    if (value === '' || re.test(value)) {
      setInputGuild(value);
    }
  };

  const handleSeason = (seasonNumber: number) => {
    if (seasonNumber <= 8) {
      setMaxLevel(MAX_LEVEL[0]);
    } else {
      setMaxLevel(MAX_LEVEL[MAX_LEVEL.length - 1]);
    }
    setSeason(seasonNumber);
  };

  const searchButton = () => {
    if (loading) {
      return (
        <Button type='submit' variant='contained' disabled>
          <Loading />
        </Button>
      );
    }
    return (
      <Button type='submit' variant='contained'>
        Search
      </Button>
    );
  };

  const messages = () => {
    if (error?.message) {
      return <em className='error'> - Error: {error.message}</em>;
    }
    if (loading) {
      return <Loading text='- Loading Characters' />;
    }
    if (loaded) {
      return (
        <em>
          {' '}
          - Loaded {characters?.length} Level {maxLevel} Characters
        </em>
      );
    }
  };

  return (
    <div className='search-bar'>
      <form onSubmit={handleCharacterSearch}>
        <Autocomplete
          disablePortal
          id='realmName'
          options={realms && realms.sort((a, b) => a.name.localeCompare(b.name)).map(a => a.name)}
          sx={{ width: 300 }}
          value={inputRealm}
          onChange={(_, newValue) => {
            setInputRealm(newValue ? newValue : '');
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
        <div className='search-info'>
          <em>U.S. Servers Only</em>
          {messages()}
        </div>
        <div className='seasons-wrap'>
          <em>Season:</em>
          <div className='seasons'>
            {SEASONS.map((seasonNumber, ind) => {
              return (
                <button
                  key={ind}
                  className={seasonNumber === season ? 'active' : 'not-active'}
                  onClick={() => handleSeason(seasonNumber)}
                >
                  {seasonNumber}
                </button>
              );
            })}
          </div>
        </div>
      </small>
    </div>
  );
};
