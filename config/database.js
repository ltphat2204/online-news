import knex from 'knex';
import './environment.js';

const connectDB = () => {
    const pg = knex({
        client: 'pg',
        connection: process.env.DB_URL,
        searchPath: ['knex', 'public'],
        pool: {
            min: 0,
            max: 7,
        }
    });

    testDB(pg);
    
    return pg;
}

const testDB = (database) => {
    console.log("Database connection is testing...");

    database.raw('SELECT 1')
    .then(() => {
        console.log('Database connection is OK');
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });
}

export default connectDB();