

export interface userData {
    email:string,
    userName:string,
    password:string,
    confirmPassword:string
}


// export interface User extends userData{
//     _id?:string,
//     avatar?:string,
//     online?:string,
//     lastSeen?:string,
//     lastMessage?:string,
//     friends:User[],
//     onBording:boolean
//     createdAt:Date,
//     updatedAt:Date
// }


export interface UsersData {
    _id?:string,
    createdAt?:Date,
    updatedAt?:Date
}

export interface User extends UsersData {
    userName: string
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    friends: User[]
    onBording:boolean,
    bio:string,
    connectionPreferences:string[],
    experience:string,
    languages:string[],
    online?:string,
    avatar?:string,
    lastSeen?:string,
    lastMessage?:string
    profession:string
}

// type Message = {
//   id: string
//   text: string
//   sender: "user" | "other"
//   timestamp: string
// }


export interface ChatMessage {
    sender: "user" | "other"
    senderId: string;
    message: string;
    timestamp: string
  }

