import './plantt.scss';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { Component, Prop, Vue } from 'vue-property-decorator';
import Timeline from './Timeline/timeline.vue';

type Event = {
    start: string
};

@Component({
    components: { Timeline },
})

class Plantt extends Vue {
    @Prop() private events: Array<Event> = [];
}

export default Plantt;
