import { Server, Socket } from "socket.io";
import { handleSocketEvents } from './controllers/socketController'

export const initSocket = (httpserver:any) => {
    const io = new Server(httpserver, {
        cors:{
            origin:process.env.BASE_URL,
            credentials:true,
            methods:["GET", "POST"]
        }
    })


    io.on('connection', (socket:Socket ) => {
        console.log(`user connected : ${socket.id}`);
        handleSocketEvents(socket, io)
    })
}