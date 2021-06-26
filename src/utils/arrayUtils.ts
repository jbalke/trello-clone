type Item = {
  id: string;
};

export const findItemIndexById = <T extends Item>(
  items: T[],
  id: string
): number => {
  return items.findIndex((item) => item.id === id);
};

export const moveItem = <T>(array: T[], from: number, to: number): T[] => {
  const item = array[from];
  return insertItemAtIndex(removeItemAtIndex(array, from), item, to);
};

export const removeItemAtIndex = <T>(array: T[], index: number): T[] => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertItemAtIndex = <T>(
  array: T[],
  item: T,
  index: number
): T[] => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};
