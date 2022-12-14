import env from './config.env';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import onConnection from './socket/connect';
import SocketMiddleware from './socket/middleware';

import morgan from './middlewares/morgan';
import path from 'path';
import ejs from 'ejs';
import sequelize from './db/config/connection';
import associate from './db/config/associate';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import Router from './routes';
import error from './middlewares/errorhandlers';


const app = express();

if (env.NODE_ENV !== 'test') {
    sequelize.authenticate().then(() => {
        associate();
        console.log('DB CONNECTED');
    }).catch((error) => {
        console.error(error);
        console.log('DB CONNECTION FAIL');
    
        process.exit(0);
    });    
}


app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(morgan.middleware);
app.use(express.static(path.join(__dirname, 'views' , 'public')));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


app.use(Router);

app.use(error.logger, error.handler);


const httpServer = createServer(app);
// SocketController.init(httpServer);

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: '*',
    }
});
io.use((socket, next)=>{next()})
// io.use(SocketMiddleware)
io.on('connection', onConnection);



export default httpServer;