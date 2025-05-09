import { Home, MessageSquare, Calendar, Search, Settings } from "lucide-react"
import api from "@/api/axiosInstense"

export default function Sidebar() {

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


  return (
    <div className="flex flex-col w-16 bg-gray-800 border-r border-gray-700">
      <div className="flex items-center justify-center h-16 bg-violet-600 text-white">
        <div className="font-bold text-xl">Logo</div>
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
        <button className="p-2 rounded-lg hover:bg-gray-700 text-gray-400">
          <Search className="w-6 h-6" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-700 text-gray-400" onClick={handleClick}>
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
