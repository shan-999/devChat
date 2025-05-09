export interface User {
    _id:string
    email: string,
    userName: string,
    password: string,
    confirmPassword?: string
    createdAt: Date,
    updatedAt: Date
}


export interface Decode {
    userId: string,
    role: string,
    user: User
}

export interface PrivateMessage {
    senderId: string;
    receiverId: string;
    message: string;
  }