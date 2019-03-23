import Moment from 'moment';

import { PlanttEvent } from '@/Plantt';

export default (): PlanttEvent[] => (
    [
        {
            id: 1,
            name: 'Passé',
            startDate: Moment().subtract(5, 'days').startOf('day'),
            endDate: Moment().subtract(3, 'days').endOf('day'),
            type: 'normal',
        },
        {
            id: 2,
            name: 'Current',
            startDate: Moment().subtract(1, 'days').startOf('day'),
            endDate: Moment().add(2, 'days').endOf('day'),
            type: 'urgent',
        },
        {
            id: 3,
            name: 'Tranquille',
            startDate: Moment().subtract(0, 'days').startOf('day'),
            endDate: Moment().add(0, 'days').endOf('day'),
            type: 'normal',
        },
        {
            id: 4,
            name: 'Futur normal',
            startDate: Moment().add(1, 'days').startOf('day'),
            endDate: Moment().add(5, 'days').endOf('day'),
            type: 'normal',
        },
        {
            id: 5,
            name: 'Futur urgent',
            startDate: Moment().add(4, 'days').startOf('day'),
            endDate: Moment().add(6, 'days').endOf('day'),
            type: 'urgent',
        },
    ]
);
