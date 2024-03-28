export const isMobileApp = () => {
  return window.location.pathname === "/mobileapp";
};

export const isMobileDevice = (navigator: any) => {
  if (!navigator) {
    return false;
  }

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};
