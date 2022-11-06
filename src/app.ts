import env from './config.env';

import express from 'express';
import sequelize from './db/config/connection';
import association from './db/config/associate';
import cookieParser from 'cookie-parser';

import Router from './routes';
import error from './middlewares/errorhandlers';


const app = express();


if (process.env.NODE_ENV !== 'test') {
    sequelize.authenticate().then(() => {
        association();
        console.log('DB CONNECTED');
    }).catch((error) => {
        console.error(error);
        console.log('DB CONNECTION FAIL');
    
        process.exit(0);
    });    
}

app.use(cookieParser());
app.use(express.json());

app.use(Router);

app.use(error.logger, error.handler);


export default app;