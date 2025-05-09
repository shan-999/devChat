"use client"



// const [messages, setMessages] = useState<Message[]>([
// {
//   id: "1",
//   text: "omg, this is amazing",
//   sender: "other",
//   timestamp: "10:32 AM",
// },
// {
//   id: "2",
//   text: "perfect! ✅",
//   sender: "user",
//   timestamp: "10:33 AM",
// },
// {
//   id: "3",
//   text: "Wow, this is really epic",
//   sender: "other",
//   timestamp: "10:34 AM",
// },
// {
//   id: "4",
//   text: "just ideas for next time",
//   sender: "other",
//   timestamp: "10:40 AM",
// },
// {
//   id: "5",
//   text: "I'll be there in 2 mins ⏰",
//   sender: "user",
//   timestamp: "10:41 AM",
// },
// {
//   id: "6",
//   text: "woohoooo",
//   sender: "user",
//   timestamp: "10:45 AM",
// },
// {
//   id: "7",
//   text: "Haha oh man",
//   sender: "user",
//   timestamp: "10:46 AM",
// },
// {
//   id: "8",
//   text: "Haha that's terrifying 😂",
//   sender: "user",
//   timestamp: "10:50 AM",
// },
// {
//   id: "9",
//   text: "aww",
//   sender: "other",
//   timestamp: "10:55 AM",
// },
// {
//   id: "10",
//   text: "omg, this is amazing",
//   sender: "other",
//   timestamp: "11:00 AM",
// },
// {
//   id: "11",
//   text: "woohoooo 🔥",
//   sender: "user",
//   timestamp: "11:05 AM",
// },
// ])

type AvailableUser = {
  id: string
  name: string
  avatar: string
  status: "online" | "offline" | "away"
  lastSeen?: string
  mutualFriends?: number
  bio?: string
}

const availableUsers: AvailableUser[] = [
  // {
  //   id: "101",
  //   name: "Emma Watson",
  //   avatar: "/placeholder.svg?height=50&width=50",
  //   status: "online",
  //   mutualFriends: 5,
  //   bio: "Software developer | Coffee lover | Gamer",
  // },
  // {
  //   id: "102",
  //   name: "John Smith",
  //   avatar: "/placeholder.svg?height=50&width=50",
  //   status: "offline",
  //   lastSeen: "3h ago",
  //   mutualFriends: 2,
  //   bio: "Photographer | Traveler | Food enthusiast",
  // },
  // {
  //   id: "103",
  //   name: "Sarah Johnson",
  //   avatar: "/placeholder.svg?height=50&width=50",
  //   status: "away",
  //   lastSeen: "30m ago",
  //   mutualFriends: 8,
  //   bio: "UX Designer | Artist | Dog lover",
  // },
  // {
  //   id: "104",
  //   name: "Michael Brown",
  //   avatar: "/placeholder.svg?height=50&width=50",
  //   status: "online",
  //   mutualFriends: 3,
  //   bio: "Marketing specialist | Music producer",
  // },
  // {
  //   id: "105",
  //   name: "Jessica Lee",
  //   avatar: "/placeholder.svg?height=50&width=50",
  //   status: "offline",
  //   lastSeen: "1d ago",
  //   mutualFriends: 1,
  //   bio: "Data scientist | Bookworm | Runner",
  // },
]


import type React from "react"
import { useState } from "react"
import { Phone, MoreVertical, Paperclip, Send, Search, Filter, Users, UserPlus, MessageSquare } from "lucide-react"
import { User } from "@/types/types"
import { useEffect } from "react"
import { socketServies } from "../services/socket";
import { addMessage } from "@/Store/slice/chatSlice"
import { ChatMessage } from "@/types/types"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { RootState } from "@/Store/store"

type ChatAreaProps = {
  activeChat: User | null
}




export default function ChatArea({ activeChat }: ChatAreaProps) {
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string>("all")
  // const [messages, setMessages] = useState<Message[]>()
  
  const dispach = useDispatch()
  const messages = useSelector((state: RootState) => state.chat.messages);
  const user = useSelector((state: RootState) => state.auth.user)


  const filteredUsers = availableUsers.filter((user) => {
    // Filter by search query
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio?.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by status
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "online" && user.status === "online") ||
      (activeFilter === "offline" && user.status === "offline") ||
      (activeFilter === "away" && user.status === "away")

    return matchesSearch && matchesFilter
  })


  // useEffect(() => {
  //   if (activeChat) {
  //     console.log("Active chat updated:", activeChat);
  //   }
  // }, [activeChat]);


  useEffect(() => {
    if(user?._id){
      const socket = socketServies.connect(user?._id);

      socket.on("receivePrivateMessage", (data: ChatMessage) => {
        dispach(addMessage(data));
      });
    }

    return () => {
      socketServies.disconnet();
    };
  }, [dispach, user]);



  const handleSendMessage = () => {
    // if (newMessage.trim()) {
    //   const newMsg: Message = {
    //     id: Date.now().toString(),
    //     text: newMessage,
    //     sender: "user",
    //     timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    //   }
    //   setMessages([...messages, newMsg])
    //   setNewMessage("")
    // }

    if (newMessage.trim()) {
      const socket = socketServies.getSocket();
      if (socket) {
        console.log(activeChat?._id);
        
        socket.emit("sendPrivateMessage", {
          senderId: user?._id,
          resiverId:activeChat?._id,
          newMessage,
        });
        setNewMessage("");
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }


  if (!activeChat || !activeChat._id) {    
    return (
      <div className="flex-1 flex flex-col bg-gray-900">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Find People</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for people..."
              className="w-full bg-gray-800 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2 mt-4 pb-2">
            <span className="text-sm text-gray-400 flex items-center">
              <Filter className="w-4 h-4 mr-1" /> Filter:
            </span>
            <button
              className={`px-3 py-1 text-sm rounded-full ${activeFilter === "all" ? "bg-violet-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
              onClick={() => setActiveFilter("all")}
            >
              All
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full ${activeFilter === "online" ? "bg-violet-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
              onClick={() => setActiveFilter("online")}
            >
              Online
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full ${activeFilter === "offline" ? "bg-violet-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
              onClick={() => setActiveFilter("offline")}
            >
              Offline
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full ${activeFilter === "away" ? "bg-violet-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
              onClick={() => setActiveFilter("away")}
            >
              Away
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-gray-800 rounded-lg p-4 flex items-start hover:bg-gray-700 transition-colors"
                >
                  <div className="relative">
                    <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-12 h-12 rounded-full" />
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${user.status === "online"
                          ? "bg-green-500"
                          : user.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                        }`}
                    />
                  </div>

                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-400">{user.bio}</p>
                      </div>
                      <button className="p-2 rounded-full bg-violet-600 text-white hover:bg-violet-700">
                        <UserPlus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center mt-2 text-xs text-gray-400">
                      {user.status === "online" ? (
                        <span className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> Online
                        </span>
                      ) : (
                        <span>Last seen {user.lastSeen}</span>
                      )}

                      {user.mutualFriends && (
                        <span className="ml-3 flex items-center">
                          <Users className="w-3 h-3 mr-1" /> {user.mutualFriends} mutual{" "}
                          {user.mutualFriends === 1 ? "friend" : "friends"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No users found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>


    )
  }


  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center">
          <img src={activeChat.avatar || "/placeholder.svg"} alt={activeChat.userName} className="w-10 h-10 rounded-full" />
          <div className="ml-3">
            <h3 className="font-medium">{activeChat.userName}</h3>
            {activeChat.online && (
              <p className="text-xs text-green-500 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                Online
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-700 text-gray-400">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-700 text-gray-400">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.senderId} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${message.sender === "user"
                    ? "bg-violet-600 text-white rounded-br-none"
                    : "bg-gray-700 text-white rounded-bl-none"
                  }`}
              >
                <p>{message.message}</p>
                <p className="text-xs opacity-70 text-right mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-violet-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No messages yet</h3>
            <p className="text-gray-400 mb-4">Start the conversation with {activeChat.userName}</p>
            <div className="bg-gray-800 px-4 py-2 rounded-lg text-gray-400 max-w-xs">
              <p>👋 Hi there! How are you doing today?</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center bg-gray-800 rounded-lg p-2">
          <button className="p-2 rounded-full hover:bg-gray-700 text-gray-400">
            <Paperclip className="w-5 h-5" />
          </button>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message"
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 text-sm px-2"
            rows={1}
          />
          <button
            className="p-2 rounded-full bg-violet-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
