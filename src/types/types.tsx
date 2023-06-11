import { Dispatch, SetStateAction } from 'react';

export type DataContextType = {
  children?: React.ReactNode;
  guild?: GuildType;
  setGuild?: Dispatch<SetStateAction<GuildType>>;
  characters?: CharacterDataType[];
  setCharacters?: Dispatch<SetStateAction<CharacterDataType[] | undefined>>;
  initialCharacters?: CharacterDataType[];
  season?: SeasonType;
  setSeason?: Dispatch<SetStateAction<SeasonType>>;
  maxLevel?: MaxLevelType;
  setMaxLevel?: Dispatch<SetStateAction<MaxLevelType>>;
  loading?: boolean;
  loaded?: boolean;
  error?: ErrorType;
  setError?: Dispatch<SetStateAction<ErrorType>>;
  sortClass?: string;
  sortName?: string;
  sortScore?: string;
  sortedClass?: boolean;
  sortedClassAll?: boolean;
  sortedName?: boolean;
  sortedScore?: boolean;
  setSortClass?: Dispatch<SetStateAction<string>>;
  setSortedClassAll?: Dispatch<SetStateAction<boolean>>;
  setSortName?: Dispatch<SetStateAction<string>>;
  setSortScore?: Dispatch<SetStateAction<string>>;
  setSortedClass?: Dispatch<SetStateAction<boolean>>;
  setSortedName?: Dispatch<SetStateAction<boolean>>;
  setSortedScore?: Dispatch<SetStateAction<boolean>>;
};

export type GuildType = {
  name?: string;
  slug?: string;
  realm?: {
    name?: string;
    slug?: string;
  };
  faction?: {
    name?: string;
  };
};

export type CharacterType = {
  character?: CharacterDataType;
};

export type CharacterDataType = {
  id?: number;
  name?: string;
  class?: {
    id?: number;
    name?: string;
  };
  realm?: {
    slug?: string;
  };
  level?: number;
  best_runs?: {
    id?: number;
    name?: string;
    short_name?: string;
    in_time?: boolean;
    level?: number;
    affix?: string;
  };
  mythic_rating?: {
    color?: {
      r?: number;
      g?: number;
      b?: number;
      a?: number;
    };
    rating?: number;
  };
};

export type SeasonType = number;
export type MaxLevelType = number;

export type ErrorType = {
  message?: string | null;
};

export type DungeonType = {
  id?: string;
  name?: string;
  short_name?: string;
};

export type DungeonsType = {
  id?: number;
  dungeons?: DungeonType;
};

export type BestRunsType = {
  dungeon?: DungeonType;
  is_completed_within_time?: boolean;
  keystone_level?: number;
  keystone_affixes?: string | any[];
};

export type MythicRunsType = {
  best_runs?: [];
  mythic_rating?: number;
  character?: string;
};

export type WowClassType = {
  id?: number;
  class?: string;
  color?: string;
};
