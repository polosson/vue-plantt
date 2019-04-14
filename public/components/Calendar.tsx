import './Calendar.scss';
import Moment from 'moment';
import { Component, Vue, Prop } from 'vue-property-decorator';

import Plantt from '@/Plantt';
import getEvents from './_data';

const { language } = window.navigator;
Moment.locale(language);

@Component
class Calendar extends Vue {
    events = getEvents();

    viewStart = Moment().subtract(4, 'days');

    viewEnd = Moment().add(6, 'days');

    private lastId = 5;

    logDates() {
        console.log(this.viewStart.format('L'), this.viewEnd.format('L'));
    }

    handlePrevDays(delta = 1) {
        this.viewStart.subtract(delta, 'days');
        this.viewEnd.subtract(delta, 'days');
        this.logDates();
    }

    handleNextDays(delta = 1) {
        this.viewStart.add(delta, 'days');
        this.viewEnd.add(delta, 'days');
        this.logDates();
    }

    handleCenterView(widthDays = 10) {
        this.viewStart = Moment().subtract(widthDays / 2, 'days');
        this.viewEnd = Moment().add(widthDays / 2, 'days');
        this.logDates();
    }

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
        const { events, viewStart, viewEnd } = this;

        return (
            <div class="Calendar">
                <div class="Calendar__toolbar">
                    <div class="Calendar__toolbar__block">
                        <button
                            class="Calendar__btn-prev"
                            onClick={() => this.handlePrevDays(1)}
                        >
                            {'< Prev day'}
                        </button>
                        <button
                            class="Calendar__btn-center"
                            onClick={() => this.handleCenterView(10)}
                        >
                            {'Center on today'}
                        </button>
                        <button
                            class="Calendar__btn-next"
                            onClick={() => this.handleNextDays(1)}
                        >
                            {'Next day >'}
                        </button>
                    </div>
                    <div class="Calendar__toolbar__block">
                        <button
                            class="Calendar__btn-add"
                            onClick={this.handleClickAddEvent}
                        >
                            {'Add random event'}
                        </button>
                    </div>
                </div>
                <Plantt
                    events={events}
                    viewStart={viewStart}
                    viewEnd={viewEnd}
                    gridWidth={1305}
                    linesCount={8}
                />
            </div>
        );
    }
}

export default Calendar;
