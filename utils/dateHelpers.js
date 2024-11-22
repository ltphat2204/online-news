import moment from 'moment';
import 'moment/locale/vi.js';
import { capitalizeFirstLetter } from './string.js';

export const dateHelpers = {
    today: () => {
        moment.locale('vi');
        const date = moment();
        const formattedDate = date.format('dddd, [ngày] DD/MM/YYYY');
        
        return capitalizeFirstLetter(formattedDate);
    }
}