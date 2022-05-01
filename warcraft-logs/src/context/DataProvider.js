import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { urlFriendly } from '../Helpers';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [guild, setGuild] = useState({
    name: 'No Thanks',
    realm: {
      name: 'Firetree'
    },
    faction: {
      name: 'Horde'
    }
  });
  const [characters, setCharacters] = useState();
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        // Common Urls
        const commonDataUrl = 'https://us.api.blizzard.com/data/wow';
        const commonProfileUrl = 'https://us.api.blizzard.com/profile/wow/character';
        const commonAPIKey = `?namespace=profile-us&locale=en_US&access_token=${process.env.REACT_APP_API_KEY}`;

        // Roster Url
        const rosterUrl = `${commonDataUrl}/guild/${urlFriendly(guild.realm.name)}/${urlFriendly(
          guild.name
        )}/roster${commonAPIKey}`;
        const rosterGet = await axios.get(rosterUrl);
        const rosterMaxCharacterLevel = rosterGet.data.members
          .filter(member => member.character.level === 60)
          .slice(0, 25);

        // Set Guild Information
        setGuild({
          name: rosterGet.data.guild.name,
          realm: {
            name: rosterGet.data.guild.realm.name
          },
          faction: {
            name: rosterGet.data.guild.faction.name
          }
        });

        // Mythic Keystone Url for all Returned Members in the Guild
        const mythicCharacterUrls = rosterMaxCharacterLevel.map(member => {
          return `${commonProfileUrl}/${member.character.realm.slug}/${urlFriendly(
            member.character.name
          )}/mythic-keystone-profile/season/7${commonAPIKey}`;
        });
        const mythicUrlGet = await axios.all(
          mythicCharacterUrls.map(url =>
            axios
              .get(url)
              .then(res => {
                return res;
              })
              .catch(err => {
                if (err.response.status === 404) {
                  return { status: 404 };
                }
              })
          )
        );
        const characterFilterStatus = mythicUrlGet.filter(member => member.status === 200);

        // Get Class Icon Image URLs
        // const classIconAPIUrl = `${commonDataUrl}/search/media?namespace=static-us&tags=playable-class&orderby=id&_page=1&access_token=${process.env.REACT_APP_API_KEY}`;
        // const classIconAPIUrlGet = await axios.get(classIconAPIUrl);
        // const classIconData = classIconAPIUrlGet.data.results.map(item => {
        //   return {
        //     class: {
        //       id: item.data.id,
        //       icon: item.data.assets[0].value
        //     }
        //   };
        // });

        const characterDataMap = characterFilterStatus.map(member => {
          return {
            best_runs: member.data.best_runs,
            mythic_rating: member.data.mythic_rating,
            character: rosterMaxCharacterLevel
              .map(rosterName => rosterName.character.name === member.data.character.name && rosterName.character)
              .filter(a => a !== false)
              .shift()
          };
        });

        // const characterDataFull = characterDataMap.map(item => {
        //   return {
        //     class_icon: classIconData
        //       .map(a => a.class.id === item.character.playable_class.id && a.class.icon)
        //       .filter(a => a !== false)
        //   };
        // });

        const characterData = [...characterDataMap].sort((a, b) =>
          b.mythic_rating.rating > a.mythic_rating.rating ? 1 : -1
        );
        console.clear(); // Clears 404 errors

        setCharacters(characterData);
        setError(null);
        setLoaded(true);
      } catch (err) {
        setLoaded(false);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [guild.name, guild.realm.name, guild.faction.name]);

  return (
    <DataContext.Provider
      value={{
        guild,
        setGuild,
        characters,
        setCharacters,
        loading,
        loaded,
        error
      }}
    >
      <div className={`wrapper ${guild.faction.name}`}>{children}</div>
    </DataContext.Provider>
  );
};

export default DataProvider;
