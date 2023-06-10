export const urlFriendly = (string: string) => {
  return string.toLowerCase().replace(/'/g, '').replace(/\s/g, '-');
};
