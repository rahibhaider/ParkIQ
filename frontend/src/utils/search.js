// Search ranking makes exact and prefix matches appear before broad address matches.
export const normalizeSearch = (value) => value.trim().toLowerCase();
const locationSearchRank = (loc, query) => {
  if (!query) return 0;
  const name = loc.name.toLowerCase();
  const address = loc.address.toLowerCase();
  const type = (loc.type || "").toLowerCase();

  if (name === query) return 0;
  if (name.startsWith(query)) return 1;
  if (name.includes(query)) return 2;
  if (type.startsWith(query)) return 3;
  if (type.includes(query)) return 4;
  if (address.includes(query)) return 5;
  return 99;
};
export const sortLocationsForSearch = (locations, query) =>
  [...locations]
    .map((loc, index) => ({ loc, rank: locationSearchRank(loc, query), index }))
    .filter(({ rank }) => rank < 99)
    .sort((a, b) => a.rank - b.rank || a.loc.name.localeCompare(b.loc.name) || a.index - b.index)

