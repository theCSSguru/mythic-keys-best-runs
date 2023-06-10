export const SORT = {
  DEFAULT: 'DEFAULT',
  DESC: 'DESC',
  ASC: 'ASC'
};

export const MAX_LEVEL = 70;
export const IMAGE_PATH_DUNGEONS = 'assets/img/dungeons/';
export const IMAGE_PATH_CLASSES = 'assets/img/classes/';

export const BATTLENET_OAUTH = 'https://us.battle.net/oauth/token';
export const BLIZZ_API_WOW = 'https://us.api.blizzard.com/data/wow';
export const BLIZZ_API_CHARACTER = 'https://us.api.blizzard.com/profile/wow/character';
export const BLIZZ_API_NAMESPACE = `?namespace=profile-us&locale=en_US&access_token=`;
export const RAIDER_IO_PATH = 'https://raider.io/characters/us/';
export const WOW_PATH = 'https://worldofwarcraft.com/en-us/character/us/';

export const WOW_CLASS = [
  { id: 1, class: 'Warrior', color: 'rgb(198, 155, 109)' },
  { id: 2, class: 'Paladin', color: 'rgb(244, 140, 186)' },
  { id: 3, class: 'Hunter', color: 'rgb(170, 211, 114)' },
  { id: 4, class: 'Rogue', color: 'rgb(255, 244, 104)' },
  { id: 5, class: 'Priest', color: 'rgb(255, 255, 255)' },
  { id: 6, class: 'Death Knight', color: 'rgb(196, 30, 58)' },
  { id: 7, class: 'Shaman', color: 'rgb(0, 112, 221)' },
  { id: 8, class: 'Mage', color: 'rgb(63, 199, 235)' },
  { id: 9, class: 'Warlock', color: 'rgb(135, 136, 238)' },
  { id: 10, class: 'Monk', color: 'rgb(0, 255, 152)' },
  { id: 11, class: 'Druid', color: 'rgb(255, 124, 10)' },
  { id: 12, class: 'Demon Hunter', color: 'rgb(163, 48, 201)' },
  { id: 13, class: 'Evoker', color: 'rgb(51, 147, 127)' }
];

export const WOW_DUNGEONS = [
  { id: 405, name: 'Brackenhide Hollow', short_name: 'bh' },
  { id: 245, name: 'Freehold', short_name: 'fh' },
  { id: 406, name: 'Halls of Infusion', short_name: 'hoi' },
  { id: 404, name: 'Neltharus', short_name: 'nelt' },
  { id: 206, name: "Neltharion's Lair", short_name: 'nl' },
  { id: 403, name: 'Uldaman: Legacy of Tyr', short_name: 'uld' },
  { id: 251, name: 'The Underrot', short_name: 'undr' },
  { id: 438, name: 'The Vortex Pinnacle', short_name: 'vp' }
];

export const DEFAULT_GUILD = {
  name: 'Misclicked',
  slug: 'misclicked',
  realm: {
    name: 'Proudmoore',
    slug: 'proudmoore'
  },
  faction: {
    name: 'Alliance'
  }
};
