<template>
  <q-page class="q-pa-lg">
    <div class="flex column">
      <div class="row-stats" style="width: 100%">
        <div class="row-card">
          <card-info
            v-for="data in dataStadistics"
            :key="data"
            :iconName="data.icon"
            :valueAmount="data.amount"
            :valueName="data.name"
          />
        </div>

        <q-date style="margin-top: 0.5rem; width: 30%" minimal />
      </div>
      <div class="system-stats flex q-px-md">
        <q-list
          bordered
          class="rounded-borders q-my-lg"
          style="max-width: 100%; width: 100%"
        >
          <q-item-label header>Reportes</q-item-label>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">Brunch this weekend?</q-item-label>
              <q-item-label caption lines="2">
                <span class="text-weight-bold">Janet</span>
                -- I'll be in your neighborhood doing errands this weekend. Do
                you want to grab brunch?
              </q-item-label>
            </q-item-section>

            <q-item-section side top> 1 min ago </q-item-section>
          </q-item>

          <q-separator inset="item" />

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">Linear Project</q-item-label>
              <q-item-label caption lines="2">
                <span class="text-weight-bold">John</span>
                -- Can we schedule a call for tomorrow?
              </q-item-label>
            </q-item-section>

            <q-item-section side top> 1 min ago </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div></div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import CardInfo from "../components/CardInfo.vue";

const cardData = [
  {
    icon: "people",
    amount: 34,
    name: "clientes",
  },
  {
    icon: "groups",
    amount: 5,
    name: "usuarios",
  },
  {
    icon: "notifications",
    amount: 2,
    name: "notificaciones",
  },
  {
    icon: "report",
    amount: 3,
    name: "reportes",
  },
];

export default defineComponent({
  name: "PageIndex",
  components: { CardInfo },
  setup() {
    return {
      dataStadistics: cardData,
    };
  },
});
</script>

<style lang="scss" scoped>
.row-stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .row-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 60%;
  }
}

@media screen and (max-width: 790px) {
  .row-stats {
    justify-content: center;
    .row-card {
      justify-content: center;
      width: 80%;
    }
  }
}
</style>
