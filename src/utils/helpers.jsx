export const urlFriendly = string => {
  return string.toLowerCase().replace(/'/g, '').replace(/\s/g, '-');
};
