<template lang="pug">
  .content
    .single-view
      Sidebar(v-bind:split='false')
      router-view(v-bind:project='$route.params.project')
</template>

<script>
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  Vue.use(VueRouter);

  import Sidebar from './Sidebar.vue'
  import Sketch from './Sketch.vue'

  export default {
    components: {
      Sidebar,
      Sketch
    }
  }
</script>

<style lang="scss">
  .single-view {
    height: 100%;
  }
</style>
