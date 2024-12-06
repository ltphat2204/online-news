import moment from 'moment';
import 'moment/locale/vi.js';
import { capitalizeFirstLetter } from './stringHelpers.js';

export const dateHelpers = {
    today: () => {
        moment.locale('vi');
        const date = moment();
        const formattedDate = date.format('dddd, [ngày] DD/MM/YYYY');
        
        return capitalizeFirstLetter(formattedDate);
    },
    formatDate: (date) => {
        moment.locale('vi');
        const localDate = moment(date);
        const formattedDate = localDate.format('L LTS');
        
        return formattedDate;
    }
}