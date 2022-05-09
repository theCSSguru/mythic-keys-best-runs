import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { urlFriendly, wowClassNames, wowDungeonShortName } from '../Helpers';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Guild State
  const [guild, setGuild] = useState({
    name: 'No Thanks',
    slug: 'no-thanks',
    realm: {
      name: 'Firetree',
      slug: 'firetree'
    },
    faction: {
      name: 'Horde'
    }
  });

  // Character States
  const [characters, setCharacters] = useState();
  const [initialCharacters, setInitialCharacters] = useState();

  // Loading and Error States
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Sort States
  const [sortClass, setSortClass] = useState('DEFAULT');
  const [sortName, setSortName] = useState('DEFAULT');
  const [sortScore, setSortScore] = useState('DESC');
  const [sortedClass, setSortedClass] = useState(false);
  const [sortedClassAll, setSortedClassAll] = useState(false);
  const [sortedName, setSortedName] = useState(false);
  const [sortedScore, setSortedScore] = useState(true);

  // Token State
  const [token, setToken] = useState('');
  useEffect(() => {
    const getToken = async () => {
      const tokenResponse = await axios.post(
        'https://us.battle.net/oauth/token',
        new URLSearchParams({
          grant_type: 'client_credentials'
        }),
        {
          auth: {
            username: process.env.REACT_APP_CLIENT_ID,
            password: process.env.REACT_APP_CLIENT_SECRET
          }
        }
      );
      setToken(tokenResponse.data.access_token);
    };
    getToken();
  }, []);

  // Call APIs and Construct Data
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        // Common Urls
        const commonDataUrl = 'https://us.api.blizzard.com/data/wow';
        const commonProfileUrl = 'https://us.api.blizzard.com/profile/wow/character';
        const commonAPIKey = `?namespace=profile-us&locale=en_US&access_token=${token}`;

        // Roster Url
        const rosterUrl = `${commonDataUrl}/guild/${guild.realm.slug}/${guild.slug}/roster${commonAPIKey}`;
        const rosterGet = await axios.get(rosterUrl);
        const rosterMaxCharacterLevel = rosterGet.data.members
          .filter(member => member.character.level === 60)
          .slice(0, 10);

        // Set Guild Information
        setGuild({
          name: rosterGet.data.guild.name,
          slug: urlFriendly(rosterGet.data.guild.name),
          realm: {
            name: rosterGet.data.guild.realm.name,
            slug: urlFriendly(rosterGet.data.guild.realm.name)
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
        const mythicFilterStatus = mythicUrlGet.filter(member => member.status === 200).map(member => member.data);

        // Get Class Icon Image URLs
        const classIconAPIUrl = `${commonDataUrl}/search/media?namespace=static-us&tags=playable-class&orderby=id&_page=1&access_token=${token}`;
        const classIconAPIUrlGet = await axios.get(classIconAPIUrl);
        const classIconData = classIconAPIUrlGet.data.results.map(item => {
          return {
            class: {
              id: item.data.id,
              icon: item.data.assets[0].value
            }
          };
        });

        const characterDataMatchStatus = mythicFilterStatus
          .map(member => {
            return {
              best_runs: member.best_runs.map(a => {
                return {
                  id: a.dungeon.id,
                  name: a.dungeon.name,
                  short_name: wowDungeonShortName(a.dungeon.id),
                  in_time: a.is_completed_within_time,
                  level: a.keystone_level,
                  affix: a.keystone_affixes[0].name
                };
              }),
              mythic_rating: member.mythic_rating,
              character: rosterMaxCharacterLevel
                .map(rosterName => rosterName.character.id === member.character.id && rosterName.character)
                .filter(a => a !== false)
                .shift()
            };
          })
          .filter(a => a.mythic_rating.rating !== 0);

        const filterBestRun = (a, b) => {
          const dungeon = b;
          return (
            a.best_runs.filter(b => b.short_name === dungeon).sort((c, d) => (d.level > c.level ? 1 : -1))[0] || 'null'
          );
        };

        const mythicKeys = characterDataMatchStatus.map(a => {
          return {
            id: a.character.id,
            dungeons: [
              filterBestRun(a, 'dos'),
              filterBestRun(a, 'gmbt'),
              filterBestRun(a, 'hoa'),
              filterBestRun(a, 'mists'),
              filterBestRun(a, 'nw'),
              filterBestRun(a, 'pf'),
              filterBestRun(a, 'sd'),
              filterBestRun(a, 'soa'),
              filterBestRun(a, 'strt'),
              filterBestRun(a, 'top')
            ]
          };
        });

        const characterDataCleanUp = characterDataMatchStatus.map(member => {
          return {
            id: member.character.id,
            name: member.character.name,
            class: {
              id: member.character.playable_class.id,
              name: wowClassNames(member.character.playable_class.id),
              icon: classIconData
                .map(a => a.class.id === member.character.playable_class.id && a.class.icon)
                .filter(a => a !== false)
                .shift()
            },
            realm: {
              slug: member.character.realm.slug
            },
            best_runs: mythicKeys
              .map(a => a.id === member.character.id && a.dungeons)
              .filter(a => a !== false)
              .shift(),
            mythic_rating: member.mythic_rating
          };
        });

        const characterData = characterDataCleanUp.sort((a, b) =>
          b.mythic_rating.rating > a.mythic_rating.rating ? 1 : -1
        );
        //console.clear(); // Clears 404 errors

        // Loads Characters
        setCharacters(characterData);
        setInitialCharacters(characterData);
        setError(null);
        setLoaded(true);
        // Resets Sort by Score
        setSortedClass(false);
        setSortedClassAll(false);
        setSortedName(false);
        setSortedScore(true);
        setSortScore('DESC');
      } catch (err) {
        setLoaded(false);
        setError({ message: 'Did not find a matching Realm and Guild' });
      } finally {
        setLoading(false);
      }
    };
    if (token !== '') {
      getData();
    }
  }, [token, guild.slug, guild.realm.slug, guild.faction.name]);

  return (
    <DataContext.Provider
      value={{
        guild,
        setGuild,
        characters,
        setCharacters,
        initialCharacters,
        loading,
        loaded,
        error,
        setError,
        sortClass,
        sortName,
        sortScore,
        sortedClass,
        sortedClassAll,
        sortedName,
        sortedScore,
        setSortClass,
        setSortedClassAll,
        setSortName,
        setSortScore,
        setSortedClass,
        setSortedName,
        setSortedScore
      }}
    >
      <div className={`wrapper ${guild.faction.name}`}>{children}</div>
    </DataContext.Provider>
  );
};

export default DataProvider;
