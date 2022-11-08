import env from './config.env';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import onConnection from './socket/connect';

import morgan from './middlewares/morgan';
import path from 'path';
import ejs from 'ejs';
import sequelize from './db/config/connection';
import association from './db/config/associate';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import Router from './routes';
import error from './middlewares/errorhandlers';


const app = express();

if (env.NODE_ENV !== 'test') {
    sequelize.authenticate().then(() => {
        association();
        console.log('DB CONNECTED');
    }).catch((error) => {
        console.error(error);
        console.log('DB CONNECTION FAIL');
    
        process.exit(0);
    });    
}

let corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(morgan.middleware);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions))

app.use(Router);

app.use(error.logger, error.handler);


const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: '*',
    }
});

// io.use((socket, next)=>{})
io.on('connection', onConnection);


export default httpServer;