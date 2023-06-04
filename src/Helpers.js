export const urlFriendly = string => {
  return string.toLowerCase().replace(/'/g, '').replace(/\s/g, '-');
};

export const wowClassNames = id => {
  switch (id) {
    case 1:
      return 'Warrior';
    case 2:
      return 'Paladin';
    case 3:
      return 'Hunter';
    case 4:
      return 'Rogue';
    case 5:
      return 'Priest';
    case 6:
      return 'Death Knight';
    case 7:
      return 'Shaman';
    case 8:
      return 'Mage';
    case 9:
      return 'Warlock';
    case 10:
      return 'Monk';
    case 11:
      return 'Druid';
    case 12:
      return 'Demon Hunter';
    case 13:
      return 'Evoker';
    default:
      return null;
  }
};

export const wowDungeonShortName = id => {
  switch (id) {
    case 405:
      return 'bh';
    case 245:
      return 'fh';
    case 406:
      return 'hoi';
    case 404:
      return 'nelt';
    case 206:
      return 'nl';
    case 403:
      return 'uld';
    case 251:
      return 'undr';
    case 438:
      return 'vp';
    default:
      return null;
  }
};
