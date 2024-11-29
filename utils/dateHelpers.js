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
        const formattedDate = moment(date).format('DD/MM/YYYY hh:mm:ss');
        
        return capitalizeFirstLetter(formattedDate);
    }
}