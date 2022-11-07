import { Socket } from 'socket.io';
import { ChatInput } from '../interfaces/socket';
import { chatInputHandler } from './chat';
import redis from '../db/redis/config';


const onConnection = (socket: Socket) => {
    console.log('SOCKET CONNECTED');

    // socket.on('chatInput', chatInputHandler);
    socket.on('chatInput', ({ input }: ChatInput) => {
        console.log(input);
        console.log(socket.id);
        console.log(socket.handshake)
        // chatOutputHandler({ output: input });
    });

    socket.on('disconnect', () => {
        console.log(socket.id, 'SOCKET DISCONNECTED');
    });
}


export default onConnection;