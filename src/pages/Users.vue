<template>
  <q-page :style-fn="myTweak" padding>
    <h1>This is my users page</h1>
  </q-page>
</template>

<script>
export default {
  setup() {
    
    // function of quasar framework, you can find this in the documentation.
    function myTweak(offset) {
      return { minHeight: offset ? `calc(100vh - ${offset}px` : "100vh" };
    }

    return {
      myTweak,
    };
  },
};
</script>
