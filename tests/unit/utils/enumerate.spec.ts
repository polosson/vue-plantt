import Moment from 'moment';
import { DateRange } from 'moment-range';

import {
    enumerateMonths,
    enumerateDays,
    enumerateHours
} from '@/utils/enumerate';

describe('enumerateMonths', () => {
    it('returns an array of described months from january to march 2019', () => {
        const viewStart = Moment('2019-01-01');
        const viewEnd = Moment('2019-03-31');
        const daysRange = new DateRange(viewStart, viewEnd);
        const enumMonths = enumerateMonths(daysRange);
        expect(enumMonths).toEqual([
            { num: '01', name: 'January', numberOfDays: 31 },
            { num: '02', name: 'February', numberOfDays: 28 },
            { num: '03', name: 'March', numberOfDays: 31 },
        ]);
    });
});

describe('enumerateDays', () => {
    it('returns an array of described days from 2019-01-01 to 2019-01-31', () => {
        const viewStart = Moment('2019-01-01');
        const viewEnd = Moment('2019-01-31');
        const daysRange = new DateRange(viewStart, viewEnd);
        const enumDays = enumerateDays(daysRange);

        expect(enumDays.length).toEqual(31);
        expect(enumDays[0]).toEqual({
            num: '01',
            offset: 0,
            date: viewStart.toDate(),
            timestamp: 1546297200,
            title: 'Tuesday',
            labelShort: '01/01',
            labelLong: 'Tuesday 01 January',
            nbEvents: 0,
            today: false,
            isLastOfMonth: false,
        });
        expect(enumDays[30]).toEqual({
            num: '31',
            offset: 30,
            date: viewEnd.toDate(),
            timestamp: 1548889200,
            title: 'Thursday',
            labelShort: '31/01',
            labelLong: 'Thursday 31 January',
            nbEvents: 0,
            today: false,
            isLastOfMonth: true,
        });
    });
});

describe('enumerateHours', () => {
    it('returns an array of described hours from 8:00 to 18:00', () => {
        const enumHours = enumerateHours();
        expect(enumHours).toEqual([
            { num: 8, title: '08' },
            { num: 9, title: '09' },
            { num: 10, title: '10' },
            { num: 11, title: '11' },
            { num: 12, title: '12' },
            { num: 13, title: '13' },
            { num: 14, title: '14' },
            { num: 15, title: '15' },
            { num: 16, title: '16' },
            { num: 17, title: '17' },
            { num: 18, title: '18' },
        ]);
    });
});
