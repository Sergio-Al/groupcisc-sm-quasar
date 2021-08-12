export default {
  setUserData(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.userName = payload.userName;
    state.userRole = payload.userRole;
  },
};
