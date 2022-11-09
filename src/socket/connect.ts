import { Socket } from 'socket.io';
import CharacterService from '../character/character.service';
import { ChatInput, ChatOutput } from '../interfaces/socket';
import { UserSession } from '../interfaces/user';
import redis from '../db/redis/config';



const onConnection = (socket: Socket) => {
    console.log('SOCKET CONNECTED');

    socket.on('info', ({ name }: UserSession)=>{
        CharacterService.findOneByName(name).then((character)=>{
            if (character === null) throw new Error();

            const script = `${character.Field.name} 채팅방에 입장하였습니다.\n`
            socket.emit('print', { script });
        });
        redis.set(socket.id, name, { EX: 60*5 });
    });

    socket.on('submit', ({ name, message }: ChatInput) => {
        console.log(message);
        redis.set(socket.id, name, { EX: 60*5 });
        
        const script = `${name}: ${message}\n`
        socket.broadcast.emit('print', { script });
        socket.emit('print', { script });
    });

    socket.on('disconnect', () => {
        redis.del(socket.id);
        console.log(socket.id, 'SOCKET DISCONNECTED');
    });
}


export default onConnection;