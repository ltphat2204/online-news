import { engine } from 'express-handlebars';

export default function setup(app, dirname) {
    // Config view engine with handlebars
    // Set the view file as .hbs
    app.engine('hbs', engine({extname: '.hbs'}));
    app.set('view engine', 'hbs');
    app.set('views', dirname + '/views');
}