export function createSortedKeyMap(data, param, order = "asc") {
  const entries = Object.entries(data);
  
  entries.sort((a, b) => {
    const valueA = a[1][param];
    const valueB = b[1][param];
    
    if (valueA == null && valueB == null) return 0;
    if (valueA == null) return 1;
    if (valueB == null) return -1;
    
    let comparison;
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      comparison = valueA - valueB;
    } else {
      comparison = String(valueA).localeCompare(String(valueB));
    }
    
    return order === "desc" ? -comparison : comparison;
  });

  const SortedMap = {};
  for (let [key, value] of entries) {
    SortedMap[value.id] = value;
  }

  return SortedMap;
}
