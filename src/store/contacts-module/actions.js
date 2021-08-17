import { api } from "boot/axios";
import { getTokenFromStorage } from "src/composable/utils";

export default {
  async requestAllContacts({ commit }) {
    const response = await api.get("/contacts", {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error(response.message || "Hubo un error al cargar los datos");
    }

    commit("populateContactsData", response.data);
  },
  async requestContactsPerClient({ commit }, payload) {
    const response = await api.get(`/contacts?ownerId=${payload.id}`, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error(response.message || "Hubo un error al cargar los datos");
    }

    commit("populateContactsPerClientData", response.data);
  },
};
