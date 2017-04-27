<template lang="pug">
  router-view
</template>

<script>
import VueRouter from 'vue-router'
import Sidebar from './Sidebar.vue'
import Sketch from './Sketch.vue'
import Vue from 'vue'
Vue.use(VueRouter);

export default {
  data () {
    return {
      activeProject: ''
    }
  },
  components: {
    Sidebar,
    Sketch
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
