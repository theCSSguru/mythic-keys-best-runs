import React, { createContext, useState } from 'react';
import { urlFriendly } from '../Helpers';
import useFetch from '../hooks/useFetch';

export const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [serverName, setServerName] = useState('Firetree');
  const [guildName, setGuildName] = useState('No Thanks');

  const { data, loading, loaded, error } = useFetch(
    `https://us.api.blizzard.com/data/wow/guild/${urlFriendly(serverName)}/${urlFriendly(
      guildName
    )}/roster?namespace=profile-us&locale=en_US&access_token=${process.env.REACT_APP_API_KEY}`
  );

  //const maxLevelCharacters = data.members.filter(member => member.character.level === 60);
  //const [characters, setCharacters] = useState(maxLevelCharacters);

  if (data) {
    return (
      <CharacterContext.Provider
        value={{
          data,
          loading,
          loaded,
          error,
          serverName,
          setServerName,
          guildName,
          setGuildName
          //characters,
          //setCharacters
        }}
      >
        <div className={`wrapper ${data.guild.faction.name}`}>{children}</div>
      </CharacterContext.Provider>
    );
  } else {
    return '';
  }
};

export default CharacterProvider;
