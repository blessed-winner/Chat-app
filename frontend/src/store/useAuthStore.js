import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import { io } from 'socket.io-client'

const BASE_URL = "http://localhost:5001"
export const useAuthStore = create((set,get)=>({
     authUser:null,
     isLoggingIn:false,
     isSigningUp:false,
     isUpdatingProfile:false,
     isCheckingAuth:true,
     onlineUsers:[],
     socket:null,

     checkAuth:async () =>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authUser:res.data })
        } catch (error) {
            console.log("Error in checkAuth",error)
            set({ authUser:null })
        } finally{
            set({ isCheckingAuth:false })
        }
     },

     signup: async (data) => {
        set({ isSigningUp:true })
        try {
            const res = await axiosInstance.post("/auth/signup",data)
            set({ authUser:res.data })
            toast.success("Signup successful")
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed")
        } finally {
            set({ isSigningUp:false })
        }
     },

     login: async (data) => {
        set({ isLoggingIn:true })
        try {
            const res = await axiosInstance.post("/auth/login",data)
            set({ authUser:res.data })
            toast.success("Login successful")
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed")
        } finally {
            set({ isLoggingIn:false })
        }
     },

     logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser:null })
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed")
        }
     },

     updateProfile: async (data) => {
        set({ isUpdatingProfile:true })
        try {
            const res = await axiosInstance.put("/auth/update-profile",data)
            set({ authUser:res.data })
            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error(error.response?.data?.message || "Profile update failed")
        } finally {
            set({ isUpdatingProfile:false })
        }
    },
    connectSocket: () => {
      if(get().socket?.connected || !get().authUser) return
      const socket = io(BASE_URL,{
        auth:{userId:get().authUser._id}
      })
      socket.connect()
      set({socket})

      socket.on("getOnlineUsers",(userIds)=>{
        set({onlineUsers:userIds})
      })
    },
    disconnectSocket:() => {
      if(get().socket?.connected){
        get().socket.disconnect()
        set({socket:null})
      }
    },

})
)