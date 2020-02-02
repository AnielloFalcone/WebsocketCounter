import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false;

Vue.filter('currency', function (value) {
    return parseFloat(value).toFixed(2) + '€';
});

new Vue(Vue.util.extend({}, App)).$mount('#app');
