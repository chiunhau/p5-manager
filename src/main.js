import Vue from 'vue'

import App from './app.vue'
import Welcome from './Welcome.vue'
import Sketch from './Sketch.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {path: '/', component: Welcome},
    {path: '/:project', component: Sketch}
  ]
});

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
