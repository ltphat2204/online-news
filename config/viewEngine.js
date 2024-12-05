import { create } from 'express-handlebars';
import { dateHelpers } from '../utils/dateHelpers.js';
import { numberHelpers } from '../utils/numberHelpers.js';
import { stringHelpers } from '../utils/stringHelpers.js';
import { compareHelpers } from '../utils/compareHelpers.js';

export default function setup(app, dirname) {
    const hbs = create({
        helpers: {
            ...dateHelpers,
            ...numberHelpers,
            ...stringHelpers,
            ...compareHelpers
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