<template>
  <div
    class="
      q-ma-sm q-pa-md
      window-width window-height
      flex
      justify-center
      items-center
      bg-gray-2
    "
  >
    <div class="my-signup flex shadow-4">
      <img src="../assets/SignUpSide.png" />
      <q-form @submit="onSubmit" class="q-px-lg flex column justify-center">
        <img src="../assets/groupcisc-logo.png" />
        <div class="q-my-sm">
          <div class="text-h6">Registra tu cuenta</div>
        </div>
        <div>
          <q-input
            v-model="emailText"
            label="Correo Electronico"
            type="email"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Este campo no debe estar vacio',
            ]"
          />
          <q-input
            v-model="nameText"
            label="Nombre"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Este campo no debe estar vacio',
            ]"
          />
          <q-input
            v-model="passwordText"
            :type="isPwd ? 'password' : 'text'"
            label="Contraseña"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'este campo no debe estar vacio',
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
        <div class="q-mt-md">
          <q-btn
            label="Registrarse"
            type="submit"
            color="primary"
            class="full-width"
          />
        </div>
        <p class="q-my-sm">
          Ya tienes una cuenta
          <router-link class="text-link" to="/system"
            >Iniciar Sesion</router-link
          >
        </p>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const isPwd = ref(true);
    const emailText = ref("");
    const nameText = ref("");
    const passwordText = ref("");

    function onSubmit() {
      console.log("success");
    }

    return {
      isPwd,
      emailText,
      nameText,
      passwordText,
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.my-signup {
  max-width: 780px;
  max-height: 493px;
  width: 100%;
  height: 100%;
  .q-form {
    width: 50%;
    img {
      display: none;
    }
    .text-link {
      text-decoration: none;
      color: black;
      &:hover {
        text-decoration: underline;
        font-weight: bold;
        color: $primary;
      }
    }
  }

  @media screen and (max-width: 810px) {
    max-width: 480px;
    .q-form {
      width: 100%;
      img {
        margin: 0 auto;
        display: block;
        width: 80px;
      }
    }
    img {
      display: none;
    }
  }
}

.body--dark {
  .q-form {
    background-color: $dark;
    .text-link {
      color: white;
    }
  }
}
</style>
