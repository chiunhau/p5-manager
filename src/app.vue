<template lang="pug">
  div
    Sidebar
    .content
      Sketch
</template>

<script>

import Sidebar from './Sidebar.vue'
import Sketch from './Sketch.vue'

export default {
  data () {
    return {
      message: 'Helo, Vue.js 2.0'
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
