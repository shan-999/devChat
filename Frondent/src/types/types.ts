

export interface userData {
    email:string,
    userName:string,
    password:string,
    confirmPassword:string
}


export interface User extends userData{
    _id?:string,
    avatar?:string,
    online?:string,
    lastSeen?:string,
    lastMessage?:string,
    friends:User[],
    onBording:boolean
    createdAt:Date,
    updatedAt:Date
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

