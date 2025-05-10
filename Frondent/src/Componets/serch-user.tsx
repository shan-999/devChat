type AvailableUser = {
  id: string
  name: string
  avatar: string
  status: "online" | "offline" | "away"
  lastSeen?: string
  mutualFriends?: number
  bio?: string
}



// const availableUsers: AvailableUser[] = [
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
//   ]




import { Search, Filter, UserPlus, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { User } from '@/types/types'
import api from '@/api/axiosInstense'
import { useSelector } from 'react-redux'
import { RootState } from '@/Store/store'
import { useDispatch } from 'react-redux'
import { setUser } from '@/Store/slice/auth'


const Serch_user = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [availableUsers, setAvailableUsers] = useState<User[] | null>(null)

  const user = useSelector((state: RootState) => state.auth.user)
  const dispach = useDispatch()


  useEffect(() => {
    const setAvailUser = async () => {
      try {
        const respones = await api.get(`/avail-users/${user?._id}`)
        if (respones.data.success) {
          setAvailableUsers(respones.data.avaiUsers)
        }

      } catch (error) {
        console.log(error);
      }
    }
    setAvailUser()

  }, [])


const addFriend = async (action:string,friendId:string) => {
  try {
    
    
    const respones = await api.post(`/addfriend/${user?._id}`,{action,friendId})

    if(respones.data.success){
      dispach(setUser(respones.data.user))
    }

  } catch (error) {
    console.log('error from addfriend : ',error);
    
  }
}

  // const filteredUsers = availableUsers?.filter((user) => {
  //     // Filter by search query
  //     const matchesSearch =
  //       user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       user.bio?.toLowerCase().includes(searchQuery.toLowerCase())

  //     // Filter by status
  //     // const matchesFilter =
  //     //   activeFilter === "all" ||
  //     //   (activeFilter === "online" && user.status === "online") ||
  //     //   (activeFilter === "offline" && user.status === "offline") ||
  //     //   (activeFilter === "away" && user.status === "away")

  //     return matchesSearch  // && matchesFilter
  //   })



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
          {availableUsers && availableUsers?.length > 0 ? (
            availableUsers?.map((user) => (
              <div
                key={user._id}
                className="bg-gray-800 rounded-lg p-4 flex items-start hover:bg-gray-700 transition-colors"
              >
                <div className="relative">
                  <img src={user.avatar || "/placeholder.svg"} alt={user.userName} className="w-12 h-12 rounded-full" />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${user.online === "online"
                      ? "bg-green-500"
                      : user.online === "away"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                      }`}
                  />
                </div>

                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{user.userName}</h3>
                      <p className="text-sm text-gray-400">{user.bio}</p>
                    </div>
                    <button className="p-2 rounded-full bg-violet-600 text-white hover:bg-violet-700" onClick={() => addFriend('add',user._id)}>
                      <UserPlus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center mt-2 text-xs text-gray-400">
                    {user.online === "online" ? (
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> Online
                      </span>
                    ) : (
                      <span>Last seen {user.lastSeen}</span>
                    )}

                    {/* {user.friends && (
                        <span className="ml-3 flex items-center">
                          <Users className="w-3 h-3 mr-1" /> {user.friends} mutual{" "}
                          {user.mutualFriends === 1 ? "friend" : "friends"}
                        </span>
                      )} */}
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

export default Serch_user
