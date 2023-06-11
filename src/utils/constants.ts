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

export const SORT = {
  DEFAULT: 'DEFAULT',
  DESC: 'DESC',
  ASC: 'ASC'
};

export const SEASONS = [7, 8, 9, 10];
export const MAX_LEVEL = [60, 70];
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
  {
    id: 10,
    dungeons: [
      { id: 405, name: 'Brackenhide Hollow', short_name: 'bh' },
      { id: 245, name: 'Freehold', short_name: 'fh' },
      { id: 406, name: 'Halls of Infusion', short_name: 'hoi' },
      { id: 404, name: 'Neltharus', short_name: 'nelt' },
      { id: 206, name: "Neltharion's Lair", short_name: 'nl' },
      { id: 403, name: 'Uldaman: Legacy of Tyr', short_name: 'uld' },
      { id: 251, name: 'The Underrot', short_name: 'undr' },
      { id: 438, name: 'The Vortex Pinnacle', short_name: 'vp' }
    ]
  },
  {
    id: 9,
    dungeons: [
      { id: 402, name: "Algeth'ar Academy", short_name: 'aa' },
      { id: 401, name: 'The Azure Vault', short_name: 'av' },
      { id: 210, name: 'Court of Stars', short_name: 'cos' },
      { id: 200, name: 'Halls of Valor', short_name: 'hov' },
      { id: 400, name: 'The Nokhud Offensive', short_name: 'no' },
      { id: 399, name: 'Ruby Life Pools', short_name: 'rlp' },
      { id: 165, name: 'Shadowmoon Burial Grounds', short_name: 'sbg' },
      { id: 2, name: 'Temple of the Jade Serpent', short_name: 'tjs' }
    ]
  },
  {
    id: 8,
    dungeons: [
      { id: 166, name: 'Grimrail Depot', short_name: 'gd' },
      { id: 392, name: "Tazavesh: So'leah's Gambit", short_name: 'gmbt' },
      { id: 169, name: 'Iron Docks', short_name: 'id' },
      { id: 227, name: 'Return to Karazhan: Lower', short_name: 'lowr' },
      { id: 391, name: 'Tazavesh: Streets of Wonder', short_name: 'strt' },
      { id: 234, name: 'Return to Karazhan: Upper', short_name: 'uppr' },
      { id: 370, name: 'Operation: Mechagon - Workshop', short_name: 'work' },
      { id: 369, name: 'Operation: Mechagon - Junkyard', short_name: 'yard' }
    ]
  },
  {
    id: 7,
    dungeons: [
      { id: 377, name: 'De Other Side', short_name: 'dos' },
      { id: 392, name: "Tazavesh: So'leah's Gambit", short_name: 'gmbt' },
      { id: 378, name: 'Halls of Atonement', short_name: 'hoa' },
      { id: 375, name: 'Mists of Tirna Scithe', short_name: 'mists' },
      { id: 376, name: 'The Necrotic Wake', short_name: 'nw' },
      { id: 379, name: 'Plaguefall', short_name: 'pf' },
      { id: 380, name: 'Sanguine Depths', short_name: 'sd' },
      { id: 381, name: 'Spires of Ascension', short_name: 'soa' },
      { id: 391, name: 'Tazavesh: Streets of Wonder', short_name: 'strt' },
      { id: 382, name: 'Theater of Pain', short_name: 'top' }
    ]
  }
];
