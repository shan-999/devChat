import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

class SocketServies {
    private socket:Socket | null = null

    connect(userId:string):Socket {
        this.socket = io(SOCKET_URL, {
            reconnection:true,
            reconnectionAttempts:5
        })


        this.socket.on('connect', () => {
            console.log('connected to socket io server');
            this.socket?.emit('register',userId)
        })

        this.socket.on('disconnect', () => {
            console.log("Disconnected from Socket.IO server");
        })

        return this.socket
    }


    disconnet(): void {
        if(this.socket){
            this.socket.disconnect()
            this.socket = null
        }
    }


    getSocket(): Socket | null {
        return this.socket
    }
}


export const socketServies = new SocketServies