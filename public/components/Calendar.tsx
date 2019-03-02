import Moment from 'moment';
import { Component, Vue, Prop } from 'vue-property-decorator';

import Plantt from '@/Plantt';
import getEvents from './_data';

@Component
class Calendar extends Vue {
    events = getEvents();

    viewDates = {
        start: Moment().subtract(4, 'days'),
        end: Moment().add(6, 'days'),
    };

    private lastId = 5;

    handleClickAddEvent() {
        this.lastId += 1;

        const random = Math.round(Math.random() * 10);

        this.events.push({
            id: this.lastId,
            name: `New event n°${this.lastId}`,
            startDate: Moment().subtract(random - 5, 'days'),
            endDate: Moment().subtract(random - 7, 'days'),
            type: 'normal',
        });
    }

    render() {
        const { events, viewDates } = this;

        return (
            <div class="Calendar">
                <Plantt events={events} viewDates={viewDates} />
                <button onClick={this.handleClickAddEvent}>ADD EVENT</button>
            </div>
        );
    }
}

export default Calendar;
