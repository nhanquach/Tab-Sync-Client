const saveItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
}

const getItem = (key: string) => {
  return localStorage.getItem(key);
}

export {
  saveItem,
  getItem
}
