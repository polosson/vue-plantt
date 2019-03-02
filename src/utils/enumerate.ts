import Moment from 'moment';
import { DateRange } from 'moment-range';

interface EnumMonth {
    num: string,
    name: string,
    numberOfDays?: number,
}

const enumerateMonths = (daysRange: DateRange) => {
    const enumMonths: EnumMonth[] = [];
    let daysInMonth = 0;
    let prevMonth = '';
    let numberOfMonth = -1;

    Array.from(daysRange.by('day')).forEach((day) => {
        daysInMonth += 1;

        if (day.format('M') !== prevMonth) {
            enumMonths.push({
                num: day.format('MM'),
                name: day.format('MMMM'),
            });
            prevMonth = day.format('M');
            daysInMonth = 1;
            numberOfMonth += 1;
        }

        if (enumMonths[numberOfMonth]) {
            enumMonths[numberOfMonth].numberOfDays = daysInMonth;
        }
    });

    return enumMonths;
};

interface EnumDays {
    num: string,
    offset: number,
    date: Date,
    timestamp: number,
    title: string,
    labelShort: string,
    labelLong: string,
    nbEvents: number,
    isToday: boolean,
    isLastOfMonth: boolean,
}

const enumerateDays = (daysRange: DateRange) => {
    const enumDays: EnumDays[] = [];
    let dayGridColumn = 0;

    Array.from(daysRange.by('day')).forEach((day) => {
        enumDays.push({
            num: day.format('DD'),
            offset: dayGridColumn,
            date: day.toDate(),
            timestamp: day.unix(),
            title: day.format('dddd'),
            labelShort: day.format('DD/MM'),
            labelLong: day.format('dddd DD MMMM'),
            nbEvents: 0,
            isToday: day.isSame(Moment(), 'day'),
            isLastOfMonth: day.isSame(day.clone().endOf('month'), 'day'),
        });
        dayGridColumn += 1;
    });

    return enumDays;
};

interface EnumHours {
    num: number,
    title: string,
}

const enumerateHours = (hourStart = 8, hourEnd = 18): EnumHours[] => {
    const hours = [...Array(hourEnd - hourStart + 1)];

    return hours.map((_, index) => {
        const currentHour = hourStart + index;
        return {
            num: currentHour,
            title: currentHour.toString().padStart(2, '0'),
        };
    });
};

export {
    EnumMonth,
    EnumDays,
    EnumHours,
    enumerateMonths,
    enumerateDays,
    enumerateHours,
};
