import { api } from "boot/axios";
import { getTokenFromStorage } from "src/composable/utils";

export default {
  async requestAllClients({ commit }) {
    const response = await api.get("/clients", {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error(response.message || "Hubo un error al cargar los datos");
    }

    commit("populateClientsData", response.data);
  },
  async requestClient({ commit }, payload) {
    const response = await api.get(`/clients/${payload.id}`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error(response.message || "Hubo un error al cargar el dato");
    }

    commit("populateClientData", response.data);
  },
};
