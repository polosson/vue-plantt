import * as MomentBase from 'moment';
import classnames from 'classnames';
import { extendMoment } from 'moment-range';
import * as tsx from 'vue-tsx-support';
import 'vue-tsx-support/enable-check';
import { Component, Prop } from 'vue-property-decorator';

import './Plantt.scss';

import {
    EnumMonth,
    EnumDays,
    EnumHours,
    enumerateMonths,
    enumerateDays,
    enumerateHours,
} from './utils/enumerate';

export interface PlanttEvent {
    id: number,
    startDate: MomentBase.Moment,
    endDate: MomentBase.Moment,
    name: string,
    type: string,
}

export interface ViewDates {
    start: MomentBase.Moment,
    end: MomentBase.Moment,
}

interface PlanttRenderEvent extends PlanttEvent {
    title: string,
    line: number,
    extraClasses: string,
    locked: boolean,
    locScale: {
        left: string,
        width: string,
        top: string,
        height: string,
    },
}

type Grid = {
    months: EnumMonth[],
    days: EnumDays[],
    hours: EnumHours[],
    dayCellsWidth: number,
    hourCellsWidth: number,
    height: number,
};

interface PlanttProps {
    events: PlanttEvent[],
    viewDates: ViewDates,
    gridWidth: number,
    linesCount?: number,
    useHours?: boolean,
    dayStartHour?: number,
    dayEndHour?: number,
    minCellWidthForDays?: number,
    minCellWidthForHours?: number,
    eventHeight?: number,
    eventMargin?: number,
    useLock?: boolean,
    autoLock?: boolean,
    lockMarginDays?: number,
}

type LineFill = (string | boolean)[];

const Moment = extendMoment(MomentBase);

@Component
class Plantt extends tsx.Component<PlanttProps> {
    @Prop() events!: PlanttEvent[];

    @Prop() viewDates!: ViewDates;

    @Prop() readonly gridWidth!: number;

    @Prop({ default: 6 }) readonly linesCount!: number;

    @Prop({ default: false }) readonly useHours!: boolean;

    @Prop({ default: 8 }) readonly dayStartHour!: number;

    @Prop({ default: 18 }) readonly dayEndHour!: number;

    @Prop({ default: 20 }) readonly minCellWidthForDays!: number;

    @Prop({ default: 150 }) readonly minCellWidthForHours!: number;

    @Prop({ default: 40 }) readonly eventHeight!: number;

    @Prop({ default: 5 }) readonly eventMargin!: number;

    @Prop({ default: true }) readonly useLock!: boolean;

    @Prop({ default: true }) readonly autoLock!: boolean;

    @Prop({ default: 2 }) readonly lockMarginDays!: number;

    private viewStart: MomentBase.Moment;

    private viewEnd: MomentBase.Moment;

    private grid: Grid;

    private linesFill: LineFill[] = [];

    constructor() {
        super();

        this.viewStart = Moment(this.viewDates.start).startOf('day');
        this.viewEnd = Moment(this.viewDates.end).endOf('day');

        const daysRange = Moment.range(this.viewStart, this.viewEnd);

        const lines = [...Array(this.linesCount)];
        this.linesFill = lines.map(_ => Array.from(daysRange.by('day')).map(() => false));

        const months = enumerateMonths(daysRange);
        const days = enumerateDays(daysRange);
        const hours = enumerateHours();

        const dayCellsWidth = this.gridWidth / days.length;
        const hourCellsWidth = dayCellsWidth / hours.length;

        this.grid = {
            months,
            days,
            hours,
            dayCellsWidth,
            hourCellsWidth,
            height: 0,
        };
    }

    private renderGrid() {
        const { months, days } = this.grid;

        return (
            <table class="Plantt__grid">
                <thead>
                    <tr>
                        {months.map(month => (
                            <th
                                key={month.num}
                                colspan={month.numberOfDays}
                                class="Plantt__monthLine"
                            >
                                {month.name}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        {days.map(this.renderGridDay)}
                    </tr>
                </thead>
            </table>
        );
    }

    private renderGridDay(day: EnumDays) {
        const dayClasses = classnames('Plantt__daysLine__day', {
            'Plantt__daysLine__day--today': day.isToday,
            'Plantt__daysLine__day--sunday': day.date.getDay() === 0,
            'Plantt__daysLine__day--lastOfMonth': day.isLastOfMonth,
        });

        const { height, dayCellsWidth } = this.grid;
        const { minCellWidthForHours, useHours } = this;

        return (
            <th
                key={day.num}
                title={day.title}
                class={dayClasses}
            >
                <div class="Plantt__labels" style={{ height: `${height}px` }}>
                    <div class="Plantt__labels__top">
                        {dayCellsWidth >= this.minCellWidthForDays
                            && day.num
                        }
                        {useHours && dayCellsWidth >= minCellWidthForHours
                            && this.renderGridHours(day)
                        }
                    </div>
                    <div class="Plantt__labels__bottom">
                        {(day.nbEvents > 0 && dayCellsWidth < 100) && (
                            <div>{day.nbEvents}</div>
                        )}
                        {(day.nbEvents > 0 && dayCellsWidth >= 100) && (
                            <div>{`${day.nbEvents} items`}</div>
                        )}
                        {(dayCellsWidth < minCellWidthForHours && dayCellsWidth > 50) && (
                            <div>{day.labelShort}</div>
                        )}
                        {(dayCellsWidth >= minCellWidthForHours) && (
                            <div>{day.labelLong}</div>
                        )}
                    </div>
                </div>
            </th>
        );
    }

    private renderGridHours(day: EnumDays) {
        const { height, hours } = this.grid;

        return (
            <table class="Plantt__hoursLine">
                <thead>
                    <tr style={{ height: height - 40 }}>
                        {hours.map(hour => (
                            <th
                                key={hour.num}
                                title={`${day.title}, ${hour.title}:00`}
                                class={day.isToday && 'Plantt__hoursLine__hour'}
                            >
                                {hour.title}
                            </th>
                        ))}
                    </tr>
                </thead>
            </table>
        );
    }

    private renderEvent(renderEvent: PlanttRenderEvent | void) {
        if (!renderEvent) {
            return null;
        }

        const {
            id,
            title,
            name,
            locked,
            locScale,
            extraClasses,
        } = renderEvent;

        const eventClasses = classnames('Plantt__event', extraClasses);
        const labelClasses = classnames('Plantt__event-label', {
            'Plantt__event-label--movable': !locked,
        });

        return (
            <div
                key={`plantt-event-${id}`}
                event-id={id}
                title={title}
                style={locScale}
                class={eventClasses}
            >
                {!locked && this.useLock && (
                    <div
                        class="Plantt__event-handle Plantt__event-handle--left"
                        event-id={id}
                        handle-side="left"
                    />
                )}
                {!locked && this.useLock && (
                    <div
                        class="Plantt__event-handle Plantt__event-handle--right"
                        event-id={id}
                        handle-side="right"
                    />
                )}
                <label class={labelClasses}>
                    {name}
                </label>
            </div>
        );
    }

    private getRenderEvent(event: PlanttEvent): PlanttRenderEvent | void {
        const {
            startDate,
            endDate,
            type,
            name,
        } = event;

        if (endDate.isBefore(this.viewStart, 'day') || startDate.isAfter(this.viewEnd, 'day')) {
            return undefined;
        }

        const format = this.useHours ? 'LLL' : 'LL';
        const startTitle = startDate.format(format);
        const endTitle = endDate.format(format);
        const title = `${event.name} (${event.type})\n${startTitle} ⇒ ${endTitle}`;

        const eventStartDay = Moment(startDate).startOf('day');
        const eventEndDay = Moment(endDate).endOf('day');
        const offsetDays = Moment.range(this.viewStart, eventStartDay).diff('days', true);
        const eventLength = Moment.range(eventStartDay, eventEndDay).diff('days', true);

        let offsetLeft = offsetDays * this.grid.dayCellsWidth;
        let eventWidth = eventLength * this.grid.dayCellsWidth;

        let daysExceed = 0;
        if (offsetDays < 0) {
            offsetLeft = 0;
            daysExceed = -(offsetDays);
        }

        if (endDate.isAfter(this.viewEnd)) {
            daysExceed = Moment.range(this.viewEnd, endDate).diff('days', true);
        }

        const locked = (
            this.useLock
            && this.autoLock
            && Moment(startDate).isBefore(Moment())
        );

        const extraClasses = classnames(`timeline__event--${type}`, {
            'timeline__event--overLeft': offsetDays < 0,
            'timeline__event--overRight': endDate.isAfter(this.viewEnd),
            'timeline__event--past': endDate.isBefore(Moment()),
            'timeline__event--locked': locked,
            'timeline__event--current': Moment().isBetween(startDate, endDate, 'hour'),
        });

        if (this.useHours) {
            const eventStartHour = startDate.hour();
            const eventEndHour = endDate.hour();
            const offsetHours = Math.floor(
                this.grid.hourCellsWidth * (eventStartHour - this.dayStartHour),
            );
            offsetLeft += offsetHours;

            if (startDate.isSame(endDate, 'day')) {
                eventWidth = this.grid.hourCellsWidth * (eventEndHour - eventStartHour);
            } else {
                if (startDate.isBefore(this.viewStart, 'day')) {
                    offsetLeft = 0;
                    eventWidth += offsetHours;
                }
                if (endDate.isAfter(this.viewEnd, 'day')) {
                    daysExceed = Math.floor(daysExceed + 1);
                    eventWidth -= offsetHours;
                } else {
                    eventWidth -= offsetHours + (
                        this.grid.hourCellsWidth * ((this.dayEndHour + 1) - eventEndHour)
                    );
                }
            }
        }

        const eventDays = [...Array(Math.round(eventLength))];
        const { days } = this.grid;
        let line = 0;
        eventDays.forEach((_, index: number) => {
            const thisDay = Moment(startDate).add(index, 'days');
            const eventDay = days.find(currentDay => (
                Moment(currentDay.date).isSame(thisDay, 'day')
            ));
            if (!eventDay) {
                return;
            }

            // eventDay.nbEvents += 1; // WARNING: MUTATION which causes an infinite loop!!!

            let dayFilled = false;
            this.linesFill.forEach((thisLine, numLine) => {
                const isEmptyLine = thisLine[eventDay.offset] === false;
                if (!isEmptyLine || dayFilled) {
                    return;
                }

                line = Math.max(line, numLine);
                this.linesFill[line][eventDay.offset] = `${eventDay.num}: ${name}`;
                dayFilled = true;
            });
        });

        const width = eventWidth - (daysExceed * this.grid.dayCellsWidth);
        const top = (line * (this.eventHeight + this.eventMargin)) + this.eventMargin;

        const locScale = {
            left: `${offsetLeft}px`,
            width: `${width}px`,
            top: `${top}px`,
            height: `${this.eventHeight}px`,
        };

        return {
            ...event,
            title,
            line,
            locked,
            locScale,
            extraClasses,
        };
    }

    render() {
        this.grid.height = (this.eventHeight * (this.linesCount + 1)) + 50;

        return (
            <div class="Plantt">
                {this.renderGrid()}
                <div class="Plantt__events-container">
                    {this.events.map((event) => {
                        const renderEvent = this.getRenderEvent(event);
                        return this.renderEvent(renderEvent);
                    })}
                </div>
            </div>
        );
    }
}

export default Plantt;
