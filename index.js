import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import setupViewEngine from './config/viewEngine.js';
import IndexRoutes from './routes/index.js';
import './config/environment.js';
import database from './config/database.js';

// Setup
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
setupViewEngine(app, __dirname);

// Config route for static files
app.use('/statics', express.static(join(__dirname, 'public')));

// Config routes
app.use('/', IndexRoutes);

// Run app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
});