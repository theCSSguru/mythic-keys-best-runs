import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { urlFriendly } from '../utils/helpers';
import {
  DataContextType,
  GuildType,
  CharacterType,
  BestRunsType,
  SeasonType,
  MaxLevelType,
  WowClassType,
  DungeonsType,
  ErrorType,
  CharacterDataType,
  DataProviderType
} from '../types/types';
import {
  BLIZZ_API_CHARACTER,
  BLIZZ_API_NAMESPACE,
  BLIZZ_API_WOW,
  DEFAULT_GUILD,
  MAX_LEVEL,
  SEASONS,
  SORT,
  WOW_CLASS,
  WOW_DUNGEONS
} from '../utils/constants';
import { useToken } from '../hooks/useToken';

const GuildState = {
  name: DEFAULT_GUILD.name,
  slug: DEFAULT_GUILD.slug,
  realm: {
    name: DEFAULT_GUILD.realm.name,
    slug: DEFAULT_GUILD.realm.slug
  },
  faction: {
    name: DEFAULT_GUILD.faction.name
  }
};

const DataContextState = {
  children: null,
  guild: GuildState,
  setGuild: () => null,
  characters: [],
  setCharacters: () => null,
  initialCharacters: [],
  season: SEASONS[SEASONS.length - 1],
  setSeason: () => null,
  maxLevel: MAX_LEVEL[MAX_LEVEL.length - 1],
  setMaxLevel: () => null,
  loading: true,
  loaded: false,
  error: { message: null },
  setError: () => null,
  sortClass: SORT.DEFAULT,
  sortName: SORT.DEFAULT,
  sortScore: SORT.DESC,
  sortedClass: false,
  sortedClassAll: false,
  sortedName: false,
  sortedScore: true,
  setSortClass: () => null,
  setSortedClassAll: () => null,
  setSortName: () => null,
  setSortScore: () => null,
  setSortedClass: () => null,
  setSortedName: () => null,
  setSortedScore: () => null
};

export const DataContext = createContext<DataContextType>(DataContextState);

export const DataProvider = ({ children }: DataProviderType) => {
  // Guild
  const [guild, setGuild] = useState<GuildType>(GuildState);

  // Character States
  const [characters, setCharacters] = useState<CharacterDataType[]>();
  const [initialCharacters, setInitialCharacters] = useState<CharacterDataType[]>();

  // Season State
  const [season, setSeason] = useState<SeasonType>(DataContextState.season);
  const [maxLevel, setMaxLevel] = useState<MaxLevelType>(DataContextState.maxLevel);

  // Loading and Error States
  const [loading, setLoading] = useState(DataContextState.loading);
  const [loaded, setLoaded] = useState(DataContextState.loaded);
  const [error, setError] = useState<ErrorType>(DataContextState.error);

  // Sort States
  const [sortClass, setSortClass] = useState(DataContextState.sortClass);
  const [sortName, setSortName] = useState(DataContextState.sortName);
  const [sortScore, setSortScore] = useState(DataContextState.sortScore);
  const [sortedClass, setSortedClass] = useState(DataContextState.sortedClass);
  const [sortedClassAll, setSortedClassAll] = useState(DataContextState.sortedClassAll);
  const [sortedName, setSortedName] = useState(DataContextState.sortedName);
  const [sortedScore, setSortedScore] = useState(DataContextState.sortedScore);

  // Token
  const { tokenData, tokenFetched } = useToken();
  const token = tokenFetched ? tokenData.access_token : null;

  // Call WoW APIs and Construct Data
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        // Set Token to API
        const BLIZZ_API_NAMESPACE_TOKEN = `${BLIZZ_API_NAMESPACE}${token}`;

        // Roster Url
        const rosterUrl = `${BLIZZ_API_WOW}/guild/${guild?.realm?.slug}/${guild?.slug}/roster${BLIZZ_API_NAMESPACE_TOKEN}`;
        const rosterGet = await axios.get(rosterUrl);
        const rosterFilterMaxCharacterLevel = rosterGet.data.members.filter(
          (member: CharacterType) => member?.character?.level === maxLevel
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
        const mythicCharacterUrls = rosterFilterMaxCharacterLevel.map((member: CharacterType) => {
          const mythicKeystoneProfileURL = `${BLIZZ_API_CHARACTER}/${member?.character?.realm?.slug}/${member?.character?.name}/mythic-keystone-profile/season/${season}`;
          return `${urlFriendly(mythicKeystoneProfileURL)}${BLIZZ_API_NAMESPACE_TOKEN}`;
        });
        const mythicUrlGet = await axios.all(
          [...mythicCharacterUrls].map(url =>
            axios
              .get(url)
              .then(response => {
                return response.data;
              })
              .catch(error => {
                if (error.response.status === 404) {
                  return null;
                }
              })
          )
        );
        const mythicFilterStatus = mythicUrlGet.filter(a => a != null);

        const characterDataMatchStatus = mythicFilterStatus
          .map(member => {
            return {
              best_runs: member.best_runs.map((a: BestRunsType) => {
                return {
                  id: a?.dungeon?.id,
                  name: a?.dungeon?.name,
                  short_name: WOW_DUNGEONS.find(b => b.id === season)?.dungeons.find(
                    (c: DungeonsType) => c.id === a?.dungeon?.id
                  )?.short_name,
                  in_time: a?.is_completed_within_time,
                  level: a?.keystone_level,
                  affix: a?.keystone_affixes?.length ? a?.keystone_affixes[0]?.name : null
                };
              }),
              mythic_rating: member.mythic_rating,
              character: rosterFilterMaxCharacterLevel
                .map(
                  (rosterName: CharacterType) =>
                    rosterName?.character?.id === member?.character?.id && rosterName?.character
                )
                .filter((a: boolean) => a !== false)
                .shift()
            };
          })
          .filter(a => a.mythic_rating.rating !== 0);

        const bestMythicKeyRuns = (a: any, b: any) => {
          const groupedDungeons = a?.best_runs?.reduce(
            (c: any, d: any) =>
              c.set(
                d?.id,
                [...(c.get(d?.id) || []), d].sort((e, f) => (f.level > e.level ? 1 : -1))
              ),
            new Map()
          );
          const bestDungeonsRan = [...groupedDungeons]
            .map(g => [...g][1][0])
            .sort((h, j) => (j.short_name < h.short_name ? 1 : -1));
          const mappedBestDungeonsRan = b.map((k: DungeonsType) => bestDungeonsRan.find(m => m.id === k.id) || 'null');
          return mappedBestDungeonsRan;
        };

        const mythicKeys = characterDataMatchStatus.map(a => {
          return {
            id: a.character.id,
            dungeons: bestMythicKeyRuns(a, WOW_DUNGEONS.find(b => b.id === season)?.dungeons)
          };
        });

        const characterDataCleanUp = characterDataMatchStatus.map(member => {
          return {
            id: member.character.id,
            name: member.character.name,
            class: {
              id: member.character.playable_class.id,
              name: WOW_CLASS.find((a: WowClassType) => a?.id === member?.character?.playable_class?.id)?.class
            },
            realm: {
              slug: member.character.realm.slug
            },
            best_runs: mythicKeys
              .map(a => a?.id === member?.character?.id && a?.dungeons)
              .filter(a => a !== false)
              .shift(),
            mythic_rating: member.mythic_rating
          };
        });

        const characterData = characterDataCleanUp.sort((a, b) =>
          b.mythic_rating.rating > a.mythic_rating.rating ? 1 : -1
        );

        // Loads Characters
        setCharacters(characterData);
        setInitialCharacters(characterData);
      } catch (err) {
        setLoaded(false);
        setError({ message: 'Did not find a matching Realm and Guild' });
        console.log(err);
      } finally {
        setLoading(false);
        setLoaded(true);
      }
    };
    if (token !== null) {
      getData();
    }
  }, [token, guild?.slug, guild?.realm?.slug, guild?.faction?.name, season, maxLevel]);

  return (
    <DataContext.Provider
      value={{
        guild,
        setGuild,
        characters,
        setCharacters,
        initialCharacters,
        season,
        setSeason,
        maxLevel,
        setMaxLevel,
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
      <div className={`wrapper ${guild?.faction?.name}`}>{children}</div>
    </DataContext.Provider>
  );
};

export default DataProvider;
