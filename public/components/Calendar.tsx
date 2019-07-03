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

    viewDates = {
        start: Moment().subtract(4, 'days').toDate(),
        end: Moment().add(6, 'days').toDate(),
    };

    private lastId = 5;

    handlePrevDays(delta = 1) {
        const { start, end } = this.viewDates;
        this.viewDates.start = Moment(start).subtract(delta, 'days').toDate();
        this.viewDates.end = Moment(end).subtract(delta, 'days').toDate();
        // this.$refs.Plantt.initGrid();
    }

    handleNextDays(delta = 1) {
        const { start, end } = this.viewDates;
        this.viewDates.start = Moment(start).add(delta, 'days').toDate();
        this.viewDates.end = Moment(end).add(delta, 'days').toDate();
    }

    handleCenterView(widthDays = 10) {
        const { start, end } = this.viewDates;
        this.viewDates.start = Moment(start).subtract(widthDays / 2, 'days').toDate();
        this.viewDates.end = Moment(end).add(widthDays / 2, 'days').toDate();
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

    render(): Vue.VNode {
        const { events } = this;

        return (
            <div class="Calendar">
                <div class="Calendar__toolbar">
                    <div class="Calendar__toolbar__nav">
                        <span>{Moment(this.viewDates.start).format('L')}</span>
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
                        <span>{Moment(this.viewDates.end).format('L')}</span>
                    </div>
                    <div class="Calendar__toolbar__actions">
                        <button
                            class="Calendar__btn-add"
                            onClick={this.handleClickAddEvent}
                        >
                            {'Add random event'} ({this.lastId})
                        </button>
                    </div>
                </div>
                <Plantt
                    ref="Plantt"
                    events={events}
                    viewStart={this.viewDates.start}
                    viewEnd={this.viewDates.end}
                    gridWidth={880}
                    linesCount={8}
                />
            </div>
        );
    }
}

export default Calendar;
