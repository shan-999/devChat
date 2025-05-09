import { Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// import { persistor } from "@/Store/store";
// import { setLogoutState } from "@/Store/slice/auth";
import { RootState } from "@/Store/store";
// import {jwtDecode} from 'jwt-decode';



export const PrivetRoutes = () => {
    const isAuthinticated = useSelector((state:RootState) => state.auth.isLogin)

    return isAuthinticated ? <Outlet/> : <Navigate to={'/login'}/>
}

