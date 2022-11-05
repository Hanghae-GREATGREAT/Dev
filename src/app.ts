import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db/config/connection';
import association from './db/config/associate';
import cookieParser from 'cookie-parser';

import Router from './routes';
import error from './middlewares/errorhandlers';


dotenv.config();
const app = express();


sequelize.authenticate().then(() => {
    association();

    console.log('DB CONNECTED');
}).catch((error) => {
    console.error(error);
    console.log('DB CONNECTION FAIL');
});

app.use(cookieParser());
app.use(express.json());

app.use(Router);

app.use(error.logger, error.handler);


export default app;