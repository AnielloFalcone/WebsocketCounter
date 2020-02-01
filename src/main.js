import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';
Vue.use(VueRouter);
Vue.config.productionTip = false;

Vue.filter('currency', function (value) {
    return parseFloat(value).toFixed(2) + '€';
});

import HomeComponent from './components/HomeComponent.vue';

const routes = [
  {
      name: 'home',
      path: '/',
      component: HomeComponent
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');
