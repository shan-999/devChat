


"use client"

import { useState } from "react"
import Sidebar from "../Componets/sideBar"
import MessageList from "../Componets/messages"
import ChatArea from "../Componets/chatArea"
import { User } from "@/types/types"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/Store/store"
import { useNavigate } from "react-router-dom"
import  ProfilePage  from '../Componets/profileCompletion'


// type User = {
//   id: string
//   name: string
//   avatar: string
//   lastMessage: string
//   time?: string
//   online?: boolean
//   tags?: string[]
// }

export default function Chat_layout() {

  const [activeChat, setActiveChat] = useState<User | null>(
    //   {
    //   id: "1",
    //       name: "Aayush Patel",
    //       avatar: "/placeholder.svg?height=40&width=40",
    //       online: true,
    //       lastMessage: "omg, this is amazing",
    // }
    null
  )
  const [onBording,setOnBording] = useState(false)

  const user = useSelector((state:RootState) => state.auth.user)
  const navigate = useNavigate()

  // useEffect(() => {
  //   if(!user?.onBording){
  //     setOnBording(false)
  //   }
  // },[])



  if(!user?.onBording){
    return (<ProfilePage/>)
  }


  return (
    <div className="flex h-screen w-full bg-gray-900 text-gray-100">
      <Sidebar setActiveChat={setActiveChat}/>
      <MessageList setActiveChat={setActiveChat} activeChat={activeChat} />
      <ChatArea activeChat={activeChat} />
    </div>
  )
}


