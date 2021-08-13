<template>
  <q-page class="q-pa-lg" style="width: 100%">
    <div class="container">
      <div class="row">
        <div class="column">
          <h4>CLIENTES</h4>
        </div>
      </div>
      <div class="row">
        <div class="column">
          <q-btn
            :outline="isDarkModeActive"
            color="primary"
            class="create-button"
            icon="person_add"
            label="Crear Nuevo"
            @click="onClick"
          />
        </div>
      </div>
      <div class="row">
        <div class="column custom-column">
          <div class="q-py-md user-table">
            <q-table
              title="Clients"
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
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
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
            </q-table>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="isDialogOpen" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Creating a new user...</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="addressTest"
            autofocus
            @keyup.enter="isDialogOpen = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Crear Nuevo" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isConfirmingDelete" persistent>
      <q-card>
        <q-card-section class="bg-accent text-white">
          <div class="text-h6">
            Eliminar id: {{ dataDeleteInfo.clientIndex }}
          </div>
        </q-card-section>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="accent" text-color="white" />
          <span class="q-ml-sm">
            ¿Seguro que quieres eliminar a
            <span class="text-weight-bold">
              {{ dataDeleteInfo.clientName }}
            </span>
            ?
          </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Eliminar" color="accent" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

const columns = [
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`, // format of sort
    sortable: true,
  },
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "nit",
    required: true,
    label: "NIT",
    align: "left",
    field: (row) => row.nit,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "address",
    required: true,
    label: "Dirección",
    align: "left",
    field: (row) => row.address,
    sortable: true,
  },
];

export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    // test variables for table
    const loading = ref(false);
    const filter = ref("");
    const rowCount = ref(10);
    const rows = ref([]);
    // end test variables for table

    const dataDeleteInfo = ref({});
    const isConfirmingDelete = ref(false);
    const isDarkModeActive = computed(() => $q.dark.isActive);
    // console.log(store.state.generalModule.isDarkModeActive); //example of vuex store

    let isDialogOpen = ref(false);
    let addressTest = ref("");

    setupClients();

    async function setupClients() {
      loading.value = true;
      try {
        await $store.dispatch("clientsModule/requestAllClients");
        $q.notify({
          name: "Éxito",
          caption: "Los datos se cargaron correctamente",
          color: "positive",
          icon: "check_circle",
        });
        loading.value = false;
        rows.value = $store.state.clientsModule.clients;
      } catch (error) {
        $q.notify({
          name: "Error",
          caption: `Hubo un error al cargar los datos`,
          color: "negative",
          icon: "warning_amber",
        });
      }
    }

    function displayDeleteDialog(clientIndex) {
      isConfirmingDelete.value = !isConfirmingDelete.value;
      const clientRow = rows.value.filter((row) => row.id == clientIndex);
      const clientName = clientRow[0].name;

      dataDeleteInfo.value.clientName = clientName;
      dataDeleteInfo.value.clientIndex = clientIndex;
    }

    function onClick() {
      console.log("this is clicked!");
      isDialogOpen.value = !isDialogOpen.value;
    }

    // function of quasar framework, you can find this in the documentation.
    function myTweak(offset) {
      return { minHeight: offset ? `calc(100vh - ${offset}px` : "100vh" };
    }

    return {
      myTweak,
      onClick,
      displayDeleteDialog,
      isConfirmingDelete,
      dataDeleteInfo,
      isDarkModeActive,
      isDialogOpen,
      addressTest,
      // returning variables for table
      columns,
      rows,

      loading,
      filter,
      rowCount,
    };
  },
};
</script>

<style lang="scss" scoped>
@use '../css/table-pages.scss';
</style>
