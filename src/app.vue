<template lang="pug">
  div
    Sidebar(v-on:changeProject='changeProject')
    .content
      Sketch(v-bind:project='activeProject')
</template>

<script>

import Sidebar from './Sidebar.vue'
import Sketch from './Sketch.vue'

export default {
  data () {
    return {
      message: 'Helo, Vue.js 2.0',
      activeProject: ''
    }
  },
  components: {
    Sidebar,
    Sketch
  },
  methods: {
    changeProject(projectName) {
      console.log("emit")
      this.activeProject = projectName;
    }
  }
}
</script>

<style lang="scss">
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background-color: #fff;
    font-family: 'Avenir Next', 'Avenir', Helvetica, 'Helvetica Neue', Futura, Arial;
    text-align: center;
    overflow: hidden;
  }

  .content {
    width: 100%;
    height: 100%;
  }
</style>
