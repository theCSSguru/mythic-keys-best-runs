import React, { useState } from 'react';
import useFetch from './hooks/useFetch';
import { urlFriendly } from './Helpers';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { Characters } from './components/Characters';
import './App.scss';

const App = () => {
  console.count('appRender: ');

  const [serverName, setServerName] = useState('Firetree');
  const [guildName, setGuildName] = useState('No Thanks');

  const { data, loading, loaded, error } = useFetch(
    `https://us.api.blizzard.com/data/wow/guild/${urlFriendly(serverName)}/${urlFriendly(
      guildName
    )}/roster?namespace=profile-us&locale=en_US&access_token=${process.env.REACT_APP_API_KEY}`
  );

  if (data) {
    return (
      <div className={`wrapper ${data.guild.faction.name}`}>
        <SearchBar
          serverName={serverName}
          guildName={guildName}
          setServerName={setServerName}
          setGuildName={setGuildName}
          data={data}
          loading={loading}
          loaded={loaded}
          error={error}
        />
        <FilterBar data={data} />
        <Characters data={data} serverName={serverName} />
      </div>
    );
  } else {
    return '';
  }
};

export default App;
