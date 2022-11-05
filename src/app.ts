import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db/config/connection';
import association from './db/config/associate';
import cookieParser from 'cookie-parser';

import Router from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cookieParser());
app.use(express.json());

app.use(Router);



app.get('/', (req, res, next) => {
    res.json({
        message: 'SUCCESS',
    });
});

app.listen(PORT, async () => {
    console.log('SERVER RUNNING ON PORT: ', PORT);

    try {
        await sequelize.authenticate();
        association();

      console.log('DB CONNECTED');
    } catch (error) {
        console.error(error);
        console.log('DB CONNECTION FAIL');
    }
});
