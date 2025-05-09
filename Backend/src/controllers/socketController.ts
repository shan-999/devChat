import { PrivateMessage } from "../types/types";
import { Server, Socket } from "socket.io";


const users: { [userId: string]: string } = {}


export const handleSocketEvents = (socket: Socket, io: Server) => {
    socket.on("register", (userId: string) => {
        users[userId] = socket.id
        console.log(`User ${userId} registered with socket ${socket.id}`);
    })


    socket.on("sendPrivateMessage", ({ senderId, receiverId, message }: PrivateMessage) => {
        const receiverSocketId = users[receiverId];
        console.log('dfsd',message);
        
        if (receiverSocketId) {
            // Send message to receiver
            io.to(receiverSocketId).emit("receivePrivateMessage", { senderId, message });
            // Send message back to sender
            io.to(users[senderId]).emit("receivePrivateMessage", { senderId, message });
        } else {
            console.log(`User ${receiverId} not found`);
        }
    });



    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        for (const userId in users) {
            if (users[userId] === socket.id) {
                delete users[userId];
                break;
            }
        }
    });
}