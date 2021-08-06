<template>
  <q-page padding>
    <div class="container">
      <div class="row">
        <div class="column">
          <h4>Detalles del Cliente</h4>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="column column-custom">
        <q-card class="my-card q-py-md">
          <q-card-section>
            <div class="text-h5">Nombre del cliente</div>
          </q-card-section>
          <q-item clickable v-ripple>
            <q-item-section top avatar>
              <q-icon
                class="q-mx-auto q-my-auto info-client-icon"
                name="print"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>NIT</q-item-label>
              <q-item-label caption lines="2"> Datos del nit </q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const currentId = ref(props.id);

    return {
      currentId,
    };
  },
};
</script>

<style lang="scss" scoped>
@use '../css/table-pages.scss';
.column-custom {
  width: 100%;
  max-width: 1440px;
  min-height: 171px;
  .my-card {
    height: 100%;
  }
  .info-client-icon {
    opacity: 54%;
  }
}
</style>
