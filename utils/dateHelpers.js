import moment from 'moment';
import 'moment/locale/vi.js';
import { capitalizeFirstLetter } from './stringHelpers.js';


const getVietnamMoment = (date) => {
    moment.locale('vi');

    if (date) {
        return moment(date).utcOffset(+420);
    }
    return moment().utcOffset(+420);
}

export const dateHelpers = {
    today: () => {
        const date = getVietnamMoment();
        const formattedDate = date.format('dddd, [ngày] DD/MM/YYYY');
        
        return capitalizeFirstLetter(formattedDate);
    },
    formatDate: (date) => {
        const localDate = getVietnamMoment(date);
        const formattedDate = localDate.format('DD/MM/YYYY hh:mm:ss');
        
        return formattedDate;
    }
}