export const isHistoryApiSupported = () => {
  return !!(window.history && window.history.pushState);
};
