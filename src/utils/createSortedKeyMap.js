export function createSortedKeyMap(data, param, order = "asc") {
  const KeyMap = {};
  let i = 0;

  for (let [key, value] of Object.entries(data)) {
    let fKey = value[param] + i;
    KeyMap[fKey] = key;
    i++;
  }
  const sortedKeys = Object.keys(KeyMap).sort();
  if (order === "desc") sortedKeys.reverse();

  const SortedMap = {};

  for (let i = 0; i < sortedKeys.length; i++) {
    let key = sortedKeys[i];
    let newData = data[KeyMap[key]];
    SortedMap[newData.id] = newData;
  }

  return SortedMap;
}
