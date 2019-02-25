import './demo.scss';
import Vue from 'vue';
import Plantt from '../src/plantt.vue';

Vue.config.productionTip = false;

new Vue({
    render: h => h(Plantt),
}).$mount('#plantt-demo');
