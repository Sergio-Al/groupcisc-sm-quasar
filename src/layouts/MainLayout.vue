<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="q-px-md q-py-xs">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-weight-medium q-px-md q-pr-lg">
          My-Company System
        </q-toolbar-title>

        <div>
          <img class="img-logo" src="../assets/groupcisc-logo.png" alt="" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="256"
      show-if-above
      bordered
      content-class="bg-secondary"
    >
      <q-img
        class="absolute-top text-secondary"
        style="box-sizing: border-box; height: 144px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="40px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div
            class="text-weight-bold title"
            style="font-size: 20px; margin-top: 20px"
          >
            User Test
          </div>
        </div>
      </q-img>
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 144px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-separator />
          <q-item
            to="/system"
            clickable
            :active="isMyComponent('principal')"
            @click="selectComponent('principal')"
            active-class="item-active"
            v-ripple
            exact
          >
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>

            <q-item-section> Principal </q-item-section>
          </q-item>

          <q-item
            to="/system/users"
            clickable
            :active="isMyComponent('usuarios')"
            @click="selectComponent('usuarios')"
            active-class="item-active"
            v-ripple
            exact
          >
            <q-item-section avatar>
              <q-icon name="assignment" />
            </q-item-section>

            <q-item-section> Usuarios </q-item-section>
          </q-item>

          <q-item
            to="/system/clients"
            clickable
            :active="isMyComponent('clientes')"
            @click="selectComponent('clientes')"
            active-class="item-active"
            v-ripple
            exact
          >
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>

            <q-item-section> clientes </q-item-section>
          </q-item>

          <q-separator spaced />

          <q-item-label header>Opciones</q-item-label>

          <q-item
            to="/system/options"
            clickable
            :active="isMyComponent('opciones')"
            @click="selectComponent('opciones')"
            active-class="item-active"
            v-ripple
            exact
          >
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section> Acciones </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

//
<script>
// import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    const leftDrawerOpen = ref(false);
    const componentSelected = ref("principal");

    const isMyComponent = (componentName) =>
      componentName === componentSelected.value;

    function selectComponent(componentName) {
      componentSelected.value = componentName;
    }

    return {
      leftDrawerOpen,
      isMyComponent,
      selectComponent,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style lang="scss" scoped>
* {
  transition: 0.1s all ease-in;
}

.q-toolbar {
  background-color: $secondary;
  color: black;
  .img-logo {
    height: 3rem;
  }
}

.q-drawer {
  .title {
    color: black;
  }
  .q-list {
    padding: 0 0.4rem;
    .q-item {
      i {
        opacity: 54%;
      }
    }
    .q-item__section {
      font-size: 14px;
      font-weight: 500;
    }
  }
}

.item-active {
  background-color: #e3f2fd;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0 1rem;
  opacity: 100%;
  color: $primary;
  i {
    opacity: 100%;
    color: $primary;
  }
}

.body--dark {
  .q-drawer {
    .title {
      color: $primary-dark-text;
    }
  }

  .item-active {
    background-color: $bg-dark-third;
    color: $primary-dark;
    i {
      color: $secondary-dark;
    }
  }
  .q-toolbar {
    background-color: $bg-dark-primary;
    color: $secondary;
  }
}
</style>
