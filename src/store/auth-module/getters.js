export default {
  getUserName: (state) => state.userName,
  isAuthenticated: (state) => !!state.token,
  getUserData: (state) => ({
    name: state.userName,
    mail: state.userMail,
    role: state.userRole,
  }),
};
