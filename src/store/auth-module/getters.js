export default {
  getUserName: (state) => state.userName,
  isAuthenticated: (state) => !!state.token,
};
