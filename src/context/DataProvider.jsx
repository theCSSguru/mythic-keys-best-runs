import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { urlFriendly } from '../utils/helpers';
import {
  BATTLENET_OAUTH,
  BLIZZ_API_CHARACTER,
  BLIZZ_API_NAMESPACE,
  BLIZZ_API_WOW,
  DEFAULT_GUILD,
  MAX_LEVEL,
  WOW_CLASS,
  WOW_DUNGEONS
} from '../utils/constants';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Guild State
  const [guild, setGuild] = useState({
    name: DEFAULT_GUILD.name,
    slug: DEFAULT_GUILD.slug,
    realm: {
      name: DEFAULT_GUILD.realm.name,
      slug: DEFAULT_GUILD.realm.slug
    },
    faction: {
      name: DEFAULT_GUILD.faction.name
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
        BATTLENET_OAUTH,
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

  // Call WoW APIs and Construct Data
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        // Set Token to API
        const BLIZZ_API_NAMESPACE_TOKEN = `${BLIZZ_API_NAMESPACE}${token}`;

        // Roster Url
        const rosterUrl = `${BLIZZ_API_WOW}/guild/${guild.realm.slug}/${guild.slug}/roster${BLIZZ_API_NAMESPACE_TOKEN}`;
        const rosterGet = await axios.get(rosterUrl);
        const rosterFilterMaxCharacterLevel = rosterGet.data.members.filter(
          member => member.character.level === MAX_LEVEL
        );

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
        const mythicCharacterUrls = rosterFilterMaxCharacterLevel.map(member => {
          return `${BLIZZ_API_CHARACTER}/${member.character.realm.slug}/${urlFriendly(
            member.character.name
          )}/mythic-keystone-profile/season/10${BLIZZ_API_NAMESPACE_TOKEN}`;
        });
        const mythicUrlGet = await axios.all(
          [...mythicCharacterUrls].map(url =>
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

        const characterDataMatchStatus = mythicFilterStatus
          .map(member => {
            return {
              best_runs: member.best_runs.map(a => {
                return {
                  id: a.dungeon.id,
                  name: a.dungeon.name,
                  short_name: WOW_DUNGEONS.find(b => b.id === a.dungeon.id).short_name,
                  in_time: a.is_completed_within_time,
                  level: a.keystone_level,
                  affix: a.keystone_affixes?.length ? a.keystone_affixes[0].name : null
                };
              }),
              mythic_rating: member.mythic_rating,
              character: rosterFilterMaxCharacterLevel
                .map(rosterName => rosterName.character.id === member.character.id && rosterName.character)
                .filter(a => a !== false)
                .shift()
            };
          })
          .filter(a => a.mythic_rating.rating !== 0);

        const bestMythicKeyRuns = (a, b) => {
          const groupedDungeons = a.best_runs.reduce(
            (c, d) =>
              c.set(
                d.id,
                [...(c.get(d.id) || []), d].sort((e, f) => (f.level > e.level ? 1 : -1))
              ),
            new Map()
          );
          const bestDungeonsRan = [...groupedDungeons]
            .map(g => [...g][1][0])
            .sort((h, j) => (j.short_name < h.short_name ? 1 : -1));
          const mappedBestDungeonsRan = b.map(k => bestDungeonsRan.find(m => m.id === k.id) || 'null');
          return mappedBestDungeonsRan;
        };

        const mythicKeys = characterDataMatchStatus.map(a => {
          return {
            id: a.character.id,
            dungeons: bestMythicKeyRuns(a, WOW_DUNGEONS)
          };
        });

        const characterDataCleanUp = characterDataMatchStatus.map(member => {
          return {
            id: member.character.id,
            name: member.character.name,
            class: {
              id: member.character.playable_class.id,
              name: WOW_CLASS.find(a => a.id === member.character.playable_class.id).class
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
        // console.clear(); // Clears 404 errors

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
        console.log(err);
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
