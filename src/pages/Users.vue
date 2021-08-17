<template>
  <q-page class="q-pa-lg q-mx-auto" style="width: 100%">
    <div class="container">
      <div class="row">
        <div class="column">
          <h4>USUARIOS</h4>
        </div>
      </div>
      <div v-if="loading" class="row">
        <div class="column custom-column">
          <table-data-skeleton />
        </div>
      </div>
      <div v-else class="row">
        <div class="column custom-column">
          <div class="q-py-md user-table">
            <q-table
              title="Users"
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
                      :outline="isDarkModeActive"
                      size="sm"
                      class="q-mx-xs"
                      color="primary"
                      icon="edit"
                      round
                    />
                    <q-btn
                      :outline="isDarkModeActive"
                      size="sm"
                      class="q-mx-xs"
                      color="accent"
                      icon="delete"
                      round
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
  </q-page>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";

import TableDataSkeleton from "../components/Skeletons/TableData.vue";

const columns = [
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
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
    name: "email",
    required: true,
    label: "Correo Electrónico",
    align: "left",
    field: (row) => row.email,
    sortable: true,
  },
  {
    name: "role",
    required: true,
    label: "Rol",
    align: "left",
    field: (row) => row.role,
    sortable: true,
  },
];

export default {
  components: { TableDataSkeleton },
  setup() {
    const $q = useQuasar();
    const $store = useStore();

    const loading = ref(false);
    const filter = ref("");
    const rowCount = ref(10);
    const rows = ref([]);
    const isDarkModeActive = computed(() => $q.dark.isActive);
    const isDialogOpen = ref(false);
    const addressTest = ref("");

    getUserData();

    async function getUserData() {
      loading.value = true;
      try {
        await $store.dispatch("usersModule/requestUsersData");
        $q.notify({
          name: "Éxito",
          caption: "Los datos se han cargado correctamente",
          color: "positive",
          icon: "check_circle",
        });
        loading.value = false;
        rows.value = $store.state.usersModule.users;
      } catch (error) {
        $q.notify({
          name: "Error",
          caption: `Ha ocurrido un error al cargar los datos ${error.response}`,
          color: "negative",
          icon: "warning_amber",
        });
      }
    }
    // function of quasar framework, you can find this in the documentation.
    function myTweak(offset) {
      return { minHeight: offset ? `calc(100vh - ${offset}px` : "100vh" };
    }

    function onClick() {
      console.log("this is clicked!");
      isDialogOpen.value = !isDialogOpen.value;
    }

    return {
      isDialogOpen,
      isDarkModeActive,
      addressTest,
      myTweak,
      onClick,
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
@use '../css/table-pages';
</style>
