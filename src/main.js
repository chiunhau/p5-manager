import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import App from './App.vue'
import Welcome from './Welcome.vue'
import Sketch from './Sketch.vue'
import Single from './Single.vue'
import Split from './Split.vue'

const router = new VueRouter({
  routes: [
    {path: '/', component: Welcome},
    {path: '/:project', component: Single},
    {path: '/split-view/:project1/:project2', component: Split}

  ]
});

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
