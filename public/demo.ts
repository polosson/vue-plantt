import './demo.scss';
import Vue from 'vue';

import Calendar from './components/Calendar';

Vue.config.productionTip = false;

new Vue({
    render: h => h(Calendar),
}).$mount('#plantt-demo');
