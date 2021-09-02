import { getTokenFromStorage } from "src/composable/utils";
import { LocalStorage, SessionStorage } from "quasar";
import { api } from "boot/axios";

function setUpData(commit, responseData) {
  LocalStorage.set("token", responseData.data.token);
  LocalStorage.set("userId", responseData.data.user.id);
  LocalStorage.set("userRole", responseData.data.user.role);
  LocalStorage.set("userName", responseData.data.user.name);

  commit("setUserData", {
    token: responseData.data.token,
    userId: responseData.data.user.id,
    userName: responseData.data.user.name,
    userRole: responseData.data.user.role,
  });
}

export default {
  async signUpUser({ commit }, payload) {
    console.log(payload);
    const response = await api.post("/users", payload);
    console.log(response);

    if (response.status !== 201) {
      throw new Error(response.message || "Hubo un error al crear al usuario");
    }

    setUpData(commit, response);
  },
  async logginUser({ commit }, payload) {
    const response = await api.post("/users/login", payload);

    if (response.status !== 200) {
      throw new Error(response.message || "proceso de inicio no completado");
    }

    setUpData(commit, response);
  },
  tryLoggin({ commit }) {
    const { userId, userName, userRole, token } = LocalStorage.getAll();

    if (userId && userName && userRole && token) {
      commit("setUserData", {
        userId,
        userName,
        userRole,
        token,
      });
    }
  },
  async getUserProfile({ commit }) {
    const response = await api.get("/userProfile", {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error(
        response.message || "Ha ocurrido un error al capturar los datos"
      );
    }

    commit("setUserDataToModify", {
      userName: response.data.name,
      userMail: response.data.email,
      userRole: response.data.role,
    });
  },
  async updateUserProfileData({ commit }, payload) {
    const response = await api.patch("/userProfile", payload, {
      headers: {
        Authorization: getTokenFromStorage(),
      },
    });

    if (response.status !== 200) {
      throw new Error(
        response.message || "Hubo un error al modificar los datos"
      );
    }
  },
};
