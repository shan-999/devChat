import { Home, MessageSquare, Calendar, Search, Settings } from "lucide-react"
import api from "@/api/axiosInstense"
import { useDispatch } from "react-redux";
import { setLogoutState } from "@/Store/slice/auth";
import { clearActiveChat, setActivateSerch } from "@/Store/slice/activeChat";
import { persistor,store } from "@/Store/store";


// interface HandleClickProps {
//   setActiveChat: (user: User | null) => void;
// }


export default function Sidebar() {

  const dispach = useDispatch()

  const handleClick = async () => {
    try {
      const res = await api.post('/samp', { data: 'some value' }, {
        withCredentials: true
      })
      if (res.data.success) {
        console.log('success', res.data.message);

      }
    } catch (error: any) {
      console.log('error from handleclick', error);
    }
  }


  const logOut = async () => {
    const respones = await api.post('/logout')

    if (respones.data.success) {
      dispach(setLogoutState())
      persistor.purge();

      store.dispatch({ type: 'RESET_STORE' }); 
    }
    dispach(setLogoutState())
  }


  return (
    <div className="flex flex-col w-16 bg-gray-800 border-r border-gray-700">
      <div className="flex items-center justify-center h-16 bg-violet-600 text-white">
        <div className="font-bold text-xl" onClick={logOut}>Logo</div>
      </div>
      <div className="flex-1 flex flex-col items-center py-4 space-y-6">
        <button className="p-2 rounded-lg hover:bg-gray-700 text-violet-400">
          <Home className="w-6 h-6" />
        </button>
        <button className="p-2 rounded-lg bg-gray-700 text-white">
          <MessageSquare className="w-6 h-6" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-700 text-gray-400">
          <Calendar className="w-6 h-6" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-700 text-gray-400" onClick={() => {
          dispach(clearActiveChat())
          dispach(setActivateSerch(true))
        }}>
          <Search className="w-6 h-6" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-700 text-gray-400" onClick={handleClick}>
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
