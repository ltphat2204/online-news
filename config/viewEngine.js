import { create } from 'express-handlebars';
import { dateHelpers } from '../utils/dateHelpers.js';

export default function setup(app, dirname) {
    const hbs = create({
        helpers: {
            ...dateHelpers
        },
        extname: '.hbs',
        defaultLayout: 'main'
    });

    // Config view engine with handlebars
    // Set the view file as .hbs
    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');
    app.set('views', dirname + '/views');
}