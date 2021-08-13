import { api } from "boot/axios";
import { getTokenFromStorage } from "src/composable/utils";

export default {
  async requestUsersData({ commit }) {
    const response = await api.get("/users", {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error(
        response.message || "Hubo un error al capturar los datos"
      );
    }

    commit("populateUsersData", response.data);
  },
};
