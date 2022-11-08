import ASIBase from './asibase';
import { Socket } from 'socket.io';
import { ASICallback } from '../interfaces/socket';



class ChatController extends ASIBase {
    
    public load(interfaces: Map<string, ASICallback>): void {
        interfaces.set('/asi/chat/message', this.chatSubmitMessage);
    }

    constructor() {
        super();
        this.chatSubmitMessage = this.chatSubmitMessage.bind(this);
    }    
    
    async chatSubmitMessage(socket: Socket, userInfo: any, params: any) {

        // return { messageId };
    }
    
    private static _instance: ChatController | null = null;
    
    static getInstance(): ChatController {
        ChatController._instance = new ChatController();
        return ChatController._instance!;
    }
}


export default ChatController;