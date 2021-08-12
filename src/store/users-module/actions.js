import { api } from "boot/axios";
import { LocalStorage } from "quasar";

export default {
  async requestUsersData({ commit }) {
    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${LocalStorage.getItem("token")}`,
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
