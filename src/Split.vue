<template lang="pug">
  .content
    .split-view.split-view--left
      Sidebar(v-bind:side='"left"' v-bind:split='true')
      Sketch(v-if='projects[0].length > 0' v-bind:project='projects[0]')
    .split-view.split-view--right
      Sidebar(v-bind:side='"right"' v-bind:split='true')
      Sketch(v-if='projects[1].length > 0' v-bind:project='projects[1]')
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
    computed: {
      projects() {
        if (this.$route.params.twoProjects) {
          return this.$route.params.twoProjects.toString().split('+')
        }
        else {
          return ['', '']
        }

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
