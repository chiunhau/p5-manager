<template lang="pug">
  .content
    .split-view.split-view--left
      Sidebar(v-bind:side='"left"' v-bind:split='true')
      Sketch(v-bind:project='$route.params.project1')
    .split-view.split-view--right
      Sidebar(v-bind:side='"right"' v-bind:split='true')
      Sketch(v-bind:project='$route.params.project2')
</template>

<script>
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  Vue.use(VueRouter);

  import Sidebar from './Sidebar.vue'
  import Sketch from './Sketch.vue'

  export default {
    data() {
      return {

      }
    },
    components: {
      Sidebar,
      Sketch
    }
  }
</script>

<style lang="scss">
  .split-view {
    width: 50%;
    height: 100%;
    float:left;

    .split-view--left {
      width: 50%;
    }

    .split-view--right {
      width: 50%;
    }
  }
</style>
