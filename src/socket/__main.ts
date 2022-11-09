import { Server, Socket } from 'socket.io';
import { ASICallback } from '../interfaces/socket';
// import ChatController from './chat';


class SocketController {
    private static _interfaces: Map<string, ASICallback> = new Map<string, ASICallback>();
    private static _init() {
        const socketInterface: Map<string, ASICallback> = SocketController._interfaces;
        
        // ChatController.getInstance().load(socketInterface);
    }

    constructor(server: any) {

        const io = new Server(server);
        SocketController._init();

        const that = this;
        io.on('connection', (socket: Socket)=>{
            console.log('SOCKET CONNECTED');
            let serverMessageId: number = 0;
            let _userInfo: any | null = null;

            socket.on('message', async(message: string) => {});

            socket.on('close', (data)=>{});
        });
    }

    private sendError(socket: Socket, messageId: number, error: Error) {}

    private static _instance: SocketController | null = null;
    static init(server: any) {
        SocketController._instance = new SocketController(server);
    }
    static getInstance(): SocketController {
        return SocketController._instance!;
    }
}

export default SocketController;