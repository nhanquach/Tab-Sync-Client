const saveItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const getItem = <T>(key: string): T | null =>
  (localStorage.getItem(key) as T) ?? null;

export { saveItem, getItem };
