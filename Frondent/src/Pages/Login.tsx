
import type React from "react"
import { userData } from "@/types/types"
import api from "@/api/axiosInstense"

import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useSelector,useDispatch } from "react-redux" 
import type { RootState } from '../Store/store'; 

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, LogIn, User  as UserIcon } from "lucide-react"
import { setLoginState } from "@/Store/slice/auth"



export default function LoginPage() {
    const [userData, setUserData] = useState<userData>({
        email: "",
        userName: "",
        password: "",
        confirmPassword: ""
    })

    const [signUpState, setSignUpState] = useState(false)

    const navigate = useNavigate()
    const dispach = useDispatch()
    const userState = useSelector((state:RootState) => state.auth.isLogin) 

    useEffect(() => {
        if (signUpState) {
            navigate('/sign-up')
        } else {
            navigate('/login')
        }
    }, [signUpState])

    useEffect(() =>{
        
        if(userState){
            navigate('/')
        }
    },[userState])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const toastId = toast.loading("Please wait...")

        try {
            let respones
            if (signUpState) {
                respones = await api.post('/sign-up', userData)

                if (respones.data.success) {
                    const user = respones.data.user
                    dispach(setLoginState(user))
                    navigate('/')
                }
            }else {
                respones = await api.post('/login',userData)

                if(respones.data.success) {
                    const user = respones.data.user
                    console.log(user);
                    dispach(setLoginState(user))
                    navigate('/')
                }
            }

        } catch (error: any) {
            console.log('error from signup', error);
            console.log(error.response.data);
            
            if (!error.response.data.success) {
                toast.update(toastId, {
                    render: error.response.data.message,
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-blue-500 mb-2">devChat</h1>
                    <h2 className="text-xl font-semibold tracking-tight text-white">{signUpState ? "Sign UP" : "Login"}</h2>
                    <p className="mt-2 text-sm text-gray-400">{signUpState ? "Create a new account to get started" : "Log in to access your account"}</p>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark" 
                />

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        {signUpState &&
                            <div>
                                <Label htmlFor="userName" className="text-white flex items-center gap-2">
                                    <UserIcon size={16} /> User Name
                                </Label>
                                <Input
                                    id="userName"
                                    type="text"
                                    value={userData.userName}
                                    onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
                                    placeholder="User_Name"
                                    required
                                    className="mt-1 h-12 bg-gray-700 border-gray-600 text-white"
                                />
                            </div>}

                        <div>
                            <Label htmlFor="email" className="text-white flex items-center gap-2">
                                <Mail size={16} /> Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                placeholder="your@email.com"
                                required
                                className="mt-1 h-12 bg-gray-700 border-gray-600 text-white"
                            />
                        </div>

                        <div>
                            <Label htmlFor="password" className="text-white flex items-center gap-2">
                                <Lock size={16} /> Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={userData.password}
                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                placeholder="••••••••"
                                required
                                className="mt-1 h-12 bg-gray-700 border-gray-600 text-white"
                            />
                        </div>

                        {signUpState &&
                            <div>
                                <Label htmlFor="confirm-password" className="text-white flex items-center gap-2">
                                    <Lock size={16} /> Confirm Password
                                </Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    value={userData.confirmPassword}
                                    onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                                    placeholder="••••••••"
                                    required
                                    className="mt-1 h-12 bg-gray-700 border-gray-600 text-white"
                                />
                            </div>}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                    >
                        <LogIn size={18} /> {signUpState ? 'Sign in' : 'Login'}
                    </Button>
                </form>

                <div className="text-center text-sm text-gray-400 mt-4">
                    {signUpState ? (
                        <>
                            Already have an account?{" "}
                            <span
                                className="font-bold underline text-white cursor-pointer"
                                onClick={() => setSignUpState(false)}
                            >
                                Sign In
                            </span>
                        </>
                    ) : (
                        <>
                            Don’t have an account?{" "}
                            <span
                                className="font-bold underline text-white cursor-pointer"
                                onClick={() => setSignUpState(true)}
                            >
                                Sign Up
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
