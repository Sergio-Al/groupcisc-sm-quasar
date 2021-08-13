<template>
  <q-page padding>
    <div class="container">
      <div class="row">
        <div class="column">
          <h4>Detalles del Cliente</h4>
        </div>
      </div>
      <div v-if="isLoadingClientData" class="row">
        <client-data-skeleton />
      </div>
      <div v-else class="row">
        <div class="column column-custom">
          <q-card class="my-card q-py-md">
            <q-card-section>
              <div class="text-h5">Nombre: {{ clientName }}</div>
            </q-card-section>
            <q-item clickable v-ripple>
              <q-item-section top avatar>
                <q-icon
                  class="q-mx-auto q-my-auto info-client-icon"
                  name="assignment"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>NIT</q-item-label>
                <q-item-label caption lines="2"> {{ clientNIT }} </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section top avatar>
                <q-icon
                  class="q-mx-auto q-my-auto info-client-icon"
                  name="business"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>Dirección</q-item-label>
                <q-item-label caption lines="2">
                  {{ clientAddress }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </div>
      <div class="row">
        <div class="column column-custom"></div>
      </div>
    </div>
  </q-page>
  <!-- 
  items to configure later...
  <q-table
    title="Treats"
    :rows="rows"
    :columns="columns"
    row-key="id"
    :filter="filter"
    :loading="loading"
    :rows-per-page-options="[10]"
  >
    <template v-slot:top>
      <q-space />
      <q-input
        outlined
        dense
        label="Buscar"
        debounce="300"
        color="primary"
        v-model="filter"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </q-td>
        <q-td auto-width>
          <q-btn
            :to="'clients/' + props.row.id"
            :outline="isDarkModeActive"
            size="sm"
            class="q-mx-xs"
            color="primary"
            icon="folder"
            round
          />
          <q-btn
            :outline="isDarkModeActive"
            size="sm"
            class="q-mx-xs"
            color="accent"
            icon="delete"
            round
            @click="displayDeleteDialog(props.row.id)"
          />
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <div class="text-left">
            This is expand slot for row above: {{ props.row.name }}.
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table> -->
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import ClientDataSkeleton from "../components/Skeletons/ClientData.vue";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: { ClientDataSkeleton },
  setup(props) {
    const currentId = ref(props.id);
    const $q = useQuasar();
    const $store = useStore();

    const clientName = ref("");
    const clientNIT = ref("");
    const clientAddress = ref("");
    const isLoadingClientData = ref(false);

    async function setupClientData() {
      isLoadingClientData.value = true;
      try {
        await $store.dispatch("clientsModule/requestClient", {
          id: currentId.value,
        });
        $q.notify({
          name: "Correcto",
          caption: "Datos del cliente cargados correctamente",
          color: "positive",
          icon: "check_circle",
        });
        isLoadingClientData.value = false;
        clientName.value = $store.state.clientsModule.selectedClientName;
        clientNIT.value = $store.state.clientsModule.selectedClientNIT;
        clientAddress.value = $store.state.clientsModule.selectedClientAddress;
      } catch (error) {
        $q.notify({
          name: "Error",
          caption: `Hubo un error al cargar los datos del cliente`,
          color: "negative",
          icon: "warning_amber",
        });
      }
    }

    setupClientData();

    return {
      currentId,
      clientName,
      clientNIT,
      clientAddress,
      isLoadingClientData,
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
