import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

(() => {
    connection.query(`
        DROP DATABASE ${process.env.DB_NAME};
    `);
    connection.query(`
        CREATE DATABASE ${process.env.DB_NAME};
    `);

    connection.end();
})();
