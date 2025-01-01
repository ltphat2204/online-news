import express from 'express';
import session from 'express-session';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import setupViewEngine from './config/viewEngine.js';
import IndexRoutes from './routes/index.js';
import ArticleRoutes from './routes/articles.js';
import category_groupRoutes from './routes/category_groups.js';
import './config/environment.js';
import database from './config/database.js';
import AdminRoutes from './routes/admin/index.js';
import AuthRoutes from './routes/auth/index.js';
import CategoryRoutes from './routes/category.js';
import setLayout from './middlewares/setLayout.js';
import preloadNavBar from './middlewares/preloadCategoryGroups.js'; 

import passport from './config/passport.js';

// Setup
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
setupViewEngine(app, __dirname);

app.set('trust proxy', 1);

app.use(session({
    secret: 'SECRET_KEY',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(setLayout);
app.use(preloadNavBar);

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));

// Config route for static files
app.use('/statics', express.static(join(__dirname, 'public')));

// Config routes
app.use('/', IndexRoutes);
app.use('/articles', ArticleRoutes);
app.use('/admin', AdminRoutes);
app.use('/auth', AuthRoutes);
app.use('/category_group', category_groupRoutes);
app.use('/category', CategoryRoutes);

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