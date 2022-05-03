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
    default:
      return null;
  }
};

export const wowDungeonShortName = id => {
  switch (id) {
    case 377:
      return 'dos';
    case 392:
      return 'gmbt';
    case 378:
      return 'hoa';
    case 375:
      return 'mists';
    case 376:
      return 'nw';
    case 379:
      return 'pf';
    case 380:
      return 'sd';
    case 381:
      return 'soa';
    case 391:
      return 'strt';
    case 382:
      return 'top';
    default:
      return null;
  }
};
