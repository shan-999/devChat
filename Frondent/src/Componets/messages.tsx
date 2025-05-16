"use client"


// const users: User[] = [
  // {
  //   id: "1",
  //   name: "Aayush Patel",
  //   avatar: "/placeholder.svg?height=40&width=40",
  //   lastMessage: "omg, this is amazing",
  //   time: "12m",
  //   online: true,
  // },
  // {
  //   id: "2",
  //   name: "Ajay Patel(ME)",
  //   avatar: "/placeholder.svg?height=40&width=40",
  //   lastMessage: "Haha oh man 🔥",
  //   time: "12m",
  //   tags: ["Question", "Help wanted"],
  // },
  // {
  //   id: "3",
  //   name: "Aayush Patel",
  //   avatar: "/placeholder.svg?height=40&width=40",
  //   lastMessage: "woohoooo",
  //   time: "24m",
  // },
  // {
  //   id: "4",
  //   name: "Ankit Nandaniya",
  //   avatar: "/placeholder.svg?height=40&width=40",
  //   lastMessage: "Haha that's terrifying 😂",
  //   time: "1h",
  //   tags: ["Bug", "Hacktoberfest"],
  // },
  // {
  //   id: "5",
  //   name: "Mohit Buddy",
  //   avatar: "/placeholder.svg?height=40&width=40",
  //   lastMessage: "omg, this is amazing",
  //   time: "5h",
  //   tags: ["Question", "Some content"],
  // },
  // {
  //   id: "6",
  //   name: "Keval Patel",
  //   avatar: "/placeholder.svg?height=40&width=40",
  //   lastMessage: "aww 😍",
  //   time: "2d",
  //   tags: ["Request"],
  // },
  // {
  //   id: "7",
  //   name: "Gajjar Hardik",
  //   avatar: "/placeholder.svg?height=40&width=40",
  //   lastMessage: "perfect!",
  //   time: "1m",
  //   tags: ["Follow up"],
  // },
// ]


  // const filteredUsers = users.filter(
  //   (user) =>
  //     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     user.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  // )

import { useEffect, useState } from "react"
import { Search, ChevronDown, PlusCircle } from "lucide-react"
import { User } from "@/types/types"
import { useSelector } from "react-redux"
import { RootState } from "@/Store/store"
import { setActiveChat,clearActiveChat, setActivateSerch } from "@/Store/slice/activeChat"
import { useDispatch } from "react-redux"
import { setUserSocketId, setReciverSocketId } from "@/Store/slice/chatSlice"
import { socketServies } from "@/services/socket"

// type User = {
//   id: string
//   userName: string
//   avatar: string
//   lastMessage: string
//   time?: string
//   online?: boolean
//   tags?: string[]
// }


export default function MessageList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [users,setUsers] = useState<User[]>([])
  

  const user = useSelector((state:RootState) => state.auth.user)
  const activeChat = useSelector((state:RootState) => state.activeChat.activeChat)
  const isSerchActive = useSelector((state:RootState) => state.activeChat.activateSerch)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user?.friends) {
      setUsers(user.friends); 
    }
  }, [user]);


  useEffect(() => {
    if(users.length >= 1 && !isSerchActive){
      dispatch(setActiveChat(users[0]))
    }
  },[users])


  const handleAddButton = () => {
    dispatch(setActivateSerch(true))
    dispatch(clearActiveChat())
  }

  const handleSelectChat = (user:User) => {
     dispatch(setActiveChat(user))
   if(user && user._id){
     const socket = socketServies.connect(user._id)
     console.log(socket);
          
     dispatch(setReciverSocketId(user._id))
   }
  }


  return (
    <div className="w-80 flex flex-col bg-gray-800 border-r border-gray-700">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">Messages</h2>
          <ChevronDown className="w-5 h-5 ml-1" />
          <span className="ml-2 text-xs bg-gray-700 px-1.5 py-0.5 rounded-md">12</span>
        </div>
        <button className="p-1 rounded-full bg-violet-600 text-white" onClick={handleAddButton}>
          <PlusCircle className="w-5 h-5" />
        </button>
      </div>

      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search messages"
            className="w-full bg-gray-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className={`flex items-start p-3 hover:bg-gray-700 cursor-pointer ${activeChat && activeChat._id === user._id ? "bg-gray-700" : ""}`}
              onClick={() => handleSelectChat(user)}
            >
              <div className="relative">
                <img src={user.avatar || "/placeholder.svg"} alt={user.userName} className="w-10 h-10 rounded-full" />
                {user.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></span>
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between">
                  <p className="font-medium truncate">{user.userName}</p>
                  <span className="text-xs text-gray-400">{user.lastSeen}</span>
                </div>
                <p className="text-sm text-gray-400 truncate">{user.lastMessage}</p>
                {/* {user.tags && (
                  <div className="flex mt-1 space-x-1">
                    {user.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2 py-0.5 rounded ${
                          tag === "Question"
                            ? "bg-amber-900 text-amber-300"
                            : tag === "Help wanted"
                              ? "bg-green-900 text-green-300"
                              : tag === "Bug"
                                ? "bg-red-900 text-red-300"
                                : tag === "Hacktoberfest"
                                  ? "bg-teal-900 text-teal-300"
                                  : tag === "Request"
                                    ? "bg-blue-900 text-blue-300"
                                    : tag === "Follow up"
                                      ? "bg-purple-900 text-purple-300"
                                      : "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )} */}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <h3 className="text-lg font-medium text-white mb-2">You have no friends</h3>
            <p className="text-gray-400 mb-4">Add a friend to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}
