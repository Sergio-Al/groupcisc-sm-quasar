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
        <div class="column">
          <h4>Contactos del Cliente</h4>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <q-btn
            :outline="isDarkModeActive"
            :disable="isLoadingClientData"
            color="primary"
            icon="person_add"
            class="create-button"
            label="Crear Nuevo"
            @click="onClick"
          />
        </div>
      </div>
      <div v-if="isLoadingClientData" class="row">
        <div class="column column-custom">
          <contacts-client-data />
        </div>
      </div>
      <div v-else class="row q-my-md">
        <div class="column column-custom">
          <q-table
            title="Treats"
            :rows="contactPerClientRow"
            :columns="columns"
            row-key="id"
            :filter="filter"
            :loading="loading"
            :rows-per-page-options="[rowCount]"
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
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th auto-width />
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body="props">
              <q-th auto-width />
              <q-tr :props="props">
                <q-td>
                  <q-btn
                    size="sm"
                    color="info"
                    round
                    dense
                    @click="props.expand = !props.expand"
                    :icon="props.expand ? 'remove' : 'add'"
                  >
                    <q-tooltip> Mas Información </q-tooltip>
                  </q-btn>
                </q-td>
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
              </q-tr>
              <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%">
                  <div class="text-left q-ma-md">
                    <p>
                      <span class="text-weight-bold">Nombre: </span>
                      {{ props.row.name }} {{ props.row.lastName }}
                    </p>
                    <p>
                      <span class="text-weight-bold">Teléfono: </span>
                      {{ props.row.telephone }}
                    </p>
                    <p>
                      <span class="text-weight-bold">Posición: </span>
                      {{ props.row.position }}
                    </p>
                    <p>
                      <span class="text-weight-bold">Correo Electrónico: </span>
                      {{ props.row.email }}
                    </p>
                    <p>
                      <span class="text-weight-bold">Compañia: </span>
                      {{ props.row.company }}
                    </p>
                    <p>
                      <span class="text-weight-bold">Dirección 1: </span>
                      {{ props.row.addressOne }}
                    </p>
                    <p>
                      <span class="text-weight-bold">Dirección 2: </span>
                      {{ props.row.addressTwo }}
                    </p>
                    <p>
                      <span class="text-weight-bold">Ciudad: </span>
                      {{ props.row.city }}
                    </p>
                    <p>
                      <span class="text-weight-bold">Pais: </span>
                      {{ props.row.country }}
                    </p>
                    <p>
                      <span class="text-weight-bold">Dominio Web: </span>
                      {{ props.row.webDomain }}
                    </p>
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
    <q-dialog v-model="isModifyDialogOpen" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Creating a new contact</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="addressTest"
            autofocus
            @keyup.enter="isModifyDialogOpen = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Crear Nuevo" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

import ClientDataSkeleton from "../components/Skeletons/ClientData.vue";
import ContactsClientData from "../components/Skeletons/ContactsClientData.vue";

const columns = [
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`, // sorting format
    sortable: true,
  },
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "left",
    field: (row) => `${row.name} ${row.lastName}`,
    sortable: true,
  },
  {
    name: "telephone",
    required: true,
    label: "Teléfono",
    align: "left",
    field: (row) => row.telephone,
    sortable: true,
  },
  {
    name: "email",
    require: true,
    label: "Correo Electronico",
    align: "left",
    field: (row) => row.email,
    sortable: true,
  },
  {
    name: "company",
    required: true,
    label: "Compañia",
    align: "left",
    field: (row) => row.company,
    sortable: true,
  },
  {
    name: "city",
    required: true,
    label: "Región/Pais",
    align: "left",
    field: (row) => `${row.city} - ${row.country}`,
    sortable: true,
  },
];

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: { ClientDataSkeleton, ContactsClientData },
  setup(props) {
    const currentId = ref(props.id);
    const $q = useQuasar();
    const $store = useStore();

    const clientName = ref("");
    const clientNIT = ref("");
    const clientAddress = ref("");
    const isLoadingClientData = ref(false);
    const loading = ref(false);
    const filter = ref("");
    const rowCount = ref(5);
    const contactPerClientRow = ref([]);
    const isModifyDialogOpen = ref(false);

    const isDarkModeActive = computed(() => $q.dark.isActive);

    setupClientData();

    async function setupClientData() {
      isLoadingClientData.value = true;
      try {
        await $store.dispatch("clientsModule/requestClient", {
          id: currentId.value,
        });

        await $store.dispatch("contactsModule/requestContactsPerClient", {
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

        contactPerClientRow.value =
          $store.state.contactsModule.contactsPerClient;
      } catch (error) {
        $q.notify({
          name: "Error",
          caption: `Hubo un error al cargar los datos del cliente`,
          color: "negative",
          icon: "warning_amber",
        });
      }
    }

    function onClick() {
      isModifyDialogOpen.value = !isModifyDialogOpen.value;
    }

    return {
      currentId,
      clientName,
      clientNIT,
      clientAddress,
      isLoadingClientData,
      onClick,
      isDarkModeActive,
      isModifyDialogOpen,

      loading,
      filter,
      rowCount,
      columns,
      contactPerClientRow,
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
