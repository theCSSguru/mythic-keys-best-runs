export const urlFriendly = (string: string | undefined) => {
  return string?.toLowerCase().replace(/'/g, '').replace(/\s/g, '-');
};
