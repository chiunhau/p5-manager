<template>
  <router-view></router-view>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import Sidebar from './Sidebar.vue';
import Sketch from './Sketch.vue';
Vue.use(VueRouter);

export default {
  data() {
    return {
      activeProject: '',
    };
  },
  components: {
    Sidebar,
    Sketch,
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #fff;
  text-align: center;
  overflow: hidden;
}

.content {
  width: 100%;
  height: 100%;
}
</style>
