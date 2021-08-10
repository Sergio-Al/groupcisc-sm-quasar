import { connection } from "src/composable/utils";
import { LocalStorage, SessionStorage } from "quasar";
import { api } from "boot/axios";

export default {
//   async signUpUser({ commit }, payload) {
//     const response = await api.post("/users", JSON.stringify(payload));
//     console.log(response);
//   },
  myTest({ commit }, payload) {
    console.log(payload);
  },
};
