import { ChatInput, ChatOutput } from '../interfaces/socket';
import { Socket } from 'socket.io';


const chatInputHandler = ({ input }: ChatInput) => {
    console.log(input);
    // console.log(socket.id);
    chatOutputHandler({ output: input });
}

const chatOutputHandler = (data: ChatOutput) => {
    console.log(data)
    
}


export { chatInputHandler };
