"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Save, ArrowLeft, User, Code, Briefcase, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"
import api from "@/api/axiosInstense"
import { useSelector } from "react-redux"
import { RootState } from "@/Store/store"
import { useDispatch } from "react-redux"
import { setLoginState } from "@/Store/slice/auth"
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type LanguageOption = {
    id: string
    name: string
}

type ExperienceOption = {
    id: string
    value: string
    label: string
}

type ProfessionOption = {
    id: string
    value: string
    label: string
}

export default function ProfilePage() {
    const navigate = useNavigate()

    // Sample user data
    const [userData, setUserData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Full-stack developer passionate about creating intuitive user experiences",
    })

    // Form state
    const [formData, setFormData] = useState({
        languages: [] as string[],
        experience: "",
        profession: "",
        connectionPreferences: [] as string[],
        bio: userData.bio,
    })

    // Form validation state
    const [isFormValid, setIsFormValid] = useState(false)

    // Check form validity whenever formData changes
    useEffect(() => {
        const isValid =
            formData.languages.length > 0 &&
            formData.experience !== "" &&
            formData.profession !== "" &&
            formData.connectionPreferences.length > 0 &&
            formData.bio.trim() !== ""

        setIsFormValid(isValid)
    }, [formData])


    const user = useSelector((state: RootState) => state.auth.user)
    const dispach = useDispatch()

    // Available options
    const languageOptions: LanguageOption[] = [
        { id: "js", name: "JavaScript" },
        { id: "ts", name: "TypeScript" },
        { id: "py", name: "Python" },
        { id: "java", name: "Java" },
        { id: "csharp", name: "C#" },
        { id: "cpp", name: "C++" },
        { id: "go", name: "Go" },
        { id: "ruby", name: "Ruby" },
        { id: "php", name: "PHP" },
        { id: "swift", name: "Swift" },
        { id: "kotlin", name: "Kotlin" },
        { id: "rust", name: "Rust" },
    ]

    const experienceOptions: ExperienceOption[] = [
        { id: "exp1", value: "0-1", label: "0-1 years" },
        { id: "exp2", value: "1-3", label: "1-3 years" },
        { id: "exp3", value: "3-5", label: "3-5 years" },
        { id: "exp4", value: "5-10", label: "5-10 years" },
        { id: "exp5", value: "10+", label: "10+ years" },
    ]

    const professionOptions: ProfessionOption[] = [
        { id: "prof1", value: "student", label: "Student" },
        { id: "prof2", value: "freelancer", label: "Freelancer" },
        { id: "prof3", value: "professional", label: "Working Professional" },
        { id: "prof4", value: "hobbyist", label: "Hobbyist" },
    ]

    const connectionOptions: LanguageOption[] = [
        { id: "frontend", name: "Frontend Developers" },
        { id: "backend", name: "Backend Developers" },
        { id: "fullstack", name: "Full-stack Developers" },
        { id: "mobile", name: "Mobile Developers" },
        { id: "devops", name: "DevOps Engineers" },
        { id: "data", name: "Data Scientists" },
        { id: "ai", name: "AI/ML Engineers" },
        { id: "game", name: "Game Developers" },
    ]

    // Handle form changes
    const handleLanguageChange = (languageId: string) => {
        setFormData((prev) => {
            if (prev.languages.includes(languageId)) {
                return { ...prev, languages: prev.languages.filter((id) => id !== languageId) }
            } else {
                return { ...prev, languages: [...prev.languages, languageId] }
            }
        })
    }

    const handleConnectionChange = (connectionId: string) => {
        setFormData((prev) => {
            if (prev.connectionPreferences.includes(connectionId)) {
                return {
                    ...prev,
                    connectionPreferences: prev.connectionPreferences.filter((id) => id !== connectionId),
                }
            } else {
                return { ...prev, connectionPreferences: [...prev.connectionPreferences, connectionId] }
            }
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const toastId = toast.loading('Submitting your profile...');
    
        try {
            console.log("Form submitted:", formData);
            const response = await api.post(`/compleate-user-profile/${user?._id}`, formData);
    
            if (response.data.success) {
                dispach(setLoginState(response.data.user));
    
                toast.update(toastId, {
                    render: 'Profile updated successfully!',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000,
                    closeOnClick: true
                });
            }
        } catch (error: any) {
            toast.update(toastId, {
                render: error?.response?.data?.message || 'Something went wrong',
                type: 'error',
                isLoading: false,
                autoClose: 3000,
                closeOnClick: true
            });
    
            console.log(error?.response?.data);
        }
    };

    const calculateCompletionPercentage = () => {
        let completedFields = 0
        const totalFields = 5

        if (formData.languages.length > 0) completedFields++
        if (formData.experience !== "") completedFields++
        if (formData.profession !== "") completedFields++
        if (formData.connectionPreferences.length > 0) completedFields++
        if (formData.bio.trim() !== "") completedFields++

        return Math.round((completedFields / totalFields) * 100)
    }

    const completionPercentage = calculateCompletionPercentage()

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="max-w-4xl mx-auto p-4">
                <div className="flex items-center mb-6">
                    <button onClick={() => navigate("/")} className="p-2 mr-4 rounded-full hover:bg-gray-700 text-gray-400">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl font-bold">Complete Your Profile</h1>
                </div>

                <ToastContainer />

                <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                        <div className="relative">
                            <img
                                src={userData.avatar || "/placeholder.svg"}
                                alt={userData.name}
                                className="w-24 h-24 rounded-full border-2 border-violet-600"
                            />
                            <button className="absolute bottom-0 right-0 bg-violet-600 p-1 rounded-full">
                                <User className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-xl font-semibold">{userData.name}</h2>
                            <p className="text-gray-400">{userData.email}</p>
                            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                                <span className="px-3 py-1 bg-violet-900 text-violet-200 rounded-full text-xs">
                                    Profile {completionPercentage}% Complete
                                </span>
                                <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs flex items-center">
                                    <Code className="w-3 h-3 mr-1" /> Developer
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-violet-600 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6">
                    <div className="mb-8">
                        <div className="flex items-center mb-4">
                            <Code className="w-5 h-5 mr-2 text-violet-400" />
                            <h3 className="text-lg font-medium">Programming Languages</h3>
                        </div>
                        <p className="text-gray-400 mb-4">Which languages are you currently learning or want to learn?</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {languageOptions.map((language) => (
                                <label
                                    key={language.id}
                                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${formData.languages.includes(language.id)
                                            ? "bg-violet-900 border-violet-600"
                                            : "bg-gray-700 border-gray-600 hover:border-gray-500"
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={formData.languages.includes(language.id)}
                                        onChange={() => handleLanguageChange(language.id)}
                                    />
                                    <span>{language.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center mb-4">
                            <Briefcase className="w-5 h-5 mr-2 text-violet-400" />
                            <h3 className="text-lg font-medium">Experience Level</h3>
                        </div>
                        <p className="text-gray-400 mb-4">How many years of experience do you have in development?</p>
                        <select
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            className={`w-full bg-gray-700 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-500 ${formData.experience === "" ? "border-red-400" : "border-gray-600"
                                }`}
                        >
                            <option value="" disabled>
                                Select your experience
                            </option>
                            {experienceOptions.map((option) => (
                                <option key={option.id} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center mb-4">
                            <Briefcase className="w-5 h-5 mr-2 text-violet-400" />
                            <h3 className="text-lg font-medium">Professional Status</h3>
                        </div>
                        <p className="text-gray-400 mb-4">Are you a student, freelancer, working professional, or hobbyist?</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            {professionOptions.map((option) => (
                                <label
                                    key={option.id}
                                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${formData.profession === option.value
                                            ? "bg-violet-900 border-violet-600"
                                            : "bg-gray-700 border-gray-600 hover:border-gray-500"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="profession"
                                        className="sr-only"
                                        value={option.value}
                                        checked={formData.profession === option.value}
                                        onChange={handleInputChange}
                                    />
                                    <span>{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center mb-4">
                            <Users className="w-5 h-5 mr-2 text-violet-400" />
                            <h3 className="text-lg font-medium">Connection Preferences</h3>
                        </div>
                        <p className="text-gray-400 mb-4">What kind of developers do you prefer to connect with?</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {connectionOptions.map((connection) => (
                                <label
                                    key={connection.id}
                                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${formData.connectionPreferences.includes(connection.id)
                                            ? "bg-violet-900 border-violet-600"
                                            : "bg-gray-700 border-gray-600 hover:border-gray-500"
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={formData.connectionPreferences.includes(connection.id)}
                                        onChange={() => handleConnectionChange(connection.id)}
                                    />
                                    <span>{connection.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center mb-4">
                            <User className="w-5 h-5 mr-2 text-violet-400" />
                            <h3 className="text-lg font-medium">Bio</h3>
                        </div>
                        <p className="text-gray-400 mb-4">Tell others about yourself</p>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            rows={4}
                            className={`w-full bg-gray-700 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-500 ${formData.bio.trim() === "" ? "border-red-400" : "border-gray-600"
                                }`}
                            placeholder="Write a short bio about yourself..."
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="px-4 py-2 mr-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`px-4 py-2 rounded-lg flex items-center ${isFormValid
                                    ? "bg-violet-600 text-white hover:bg-violet-700"
                                    : "bg-gray-600 text-gray-300 cursor-not-allowed"
                                } transition-colors`}
                        >
                            <Save className="w-4 h-4 mr-2" /> Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
