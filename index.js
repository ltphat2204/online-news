import express from 'express';
import hbs_section from 'express-handlebars-sections';
import session from 'express-session';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import setupViewEngine from './config/viewEngine.js';
import IndexRoutes from './routes/index.js';
import ArticleRoutes from './routes/articles.js';
import './config/environment.js';
import database from './config/database.js';
import AdminRoutes from './routes/admin/index.js';
import AuthRoutes from './routes/auth/index.js';
import setLayout from './middlewares/setLayout.js';
import passport from './config/passport.js';

// Setup
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
setupViewEngine(app, __dirname);

app.set('trust proxy', 1);

app.engine('hbs', engine({
    extname: 'hbs',
    helpers: {
        fill_section: hbs_section()
    }
}));

app.use(session({
    secret: 'SECRET_KEY',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(setLayout);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Config route for static files
app.use('/statics', express.static(join(__dirname, 'public')));

// Config routes
app.use('/', IndexRoutes);
app.use('/articles', ArticleRoutes);
app.use('/admin', AdminRoutes);
app.use('/auth', AuthRoutes);

// Xử lý lỗi 404
app.use((req, res) => {
  res.status(404).render('404', {
      title: 'Không tìm thấy trang',
      message: 'Rất tiếc, trang bạn tìm kiếm không tồn tại.'
  });
});

// Run app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
});