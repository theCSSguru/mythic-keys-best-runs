export type DataContextType = {
  children?: React.ReactNode;
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
  character?: {
    id?: number;
    name?: string;
    class?: {
      id?: number;
      name?: string;
    };
    level?: number;
    realm?: {
      slug?: string;
    };
    playable_class?: {
      id?: number;
    };
    best_runs?: any;
    mythic_rating?: number;
  };
};

export type SeasonType = number;

export type MaxLevelType = number;

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

export type ErrorType = {
  message?: string | null;
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
