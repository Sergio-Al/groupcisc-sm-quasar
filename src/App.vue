<template>
  <router-view />
</template>
<script>
import { defineComponent, onMounted } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "App",
  setup() {
    const $q = useQuasar();
    onMounted(() => {
      setTimeout(() => {
        $q.dark.toggle();
      }, 5000);
    });
  },
});
</script>
