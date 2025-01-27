export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem('accessToken');
};
