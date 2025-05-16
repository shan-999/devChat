


"use client"

import { useState } from "react"
import Sidebar from "../Componets/sideBar"
import MessageList from "../Componets/messages"
import ChatArea from "../Componets/chatArea"
import { User } from "@/types/types"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/Store/store"
import ProfilePage from '../Componets/profileCompletion'
import api from "@/api/axiosInstense"
import { useDispatch } from "react-redux"
import { setUser } from "@/Store/slice/auth"


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

  // const [activeChat, setActiveChat] = useState<User | null>(
  //   //   {
  //   //   id: "1",
  //   //       name: "Aayush Patel",
  //   //       avatar: "/placeholder.svg?height=40&width=40",
  //   //       online: true,
  //   //       lastMessage: "omg, this is amazing",
  //   // }
  //   null
  // )

  const user = useSelector((state: RootState) => state.auth.user)
  const dispach = useDispatch()



  useEffect(() => {
    const updateUser = async () => {
      try {
        const respones = await api.get(`/get-user/${user?._id}`)

        if (respones.data.success) {
          dispach(setUser(respones.data.user))
        }
      } catch (error) {
        console.log('error form update user : ', user);
      }
    }
    updateUser()
  }, [])



  if (user && !user?.onBording) {
    return (<ProfilePage />)
  }


  return (
    <div className="flex h-screen w-full bg-gray-900 text-gray-100">
      <Sidebar />
      <MessageList/>
      <ChatArea  />
    </div>
  )
}


