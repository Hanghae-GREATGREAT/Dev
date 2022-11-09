import { NextFunction } from "express";
import { Socket } from "socket.io";

const SocketMiddleware = (socket: Socket, next: NextFunction) => {

    console.log(socket.id);
    console.log(socket.handshake)

    next();
}

export default SocketMiddleware;