import { create } from "zustand"
import { axiosInstance } from "../lib/axios"

export const useAuthStore = create((set)=>({
     authUser:null,
     isLoggingIn:false,
     isSigningUp:false,
     isUpdatingProfile:false,

     isCheckingAuth:true,

     checkAuth:async () =>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authUser:res.data })
        } catch (error) {
            console.log("Error in checkAuth")
            set({ authUser:null })
        } finally{
            set({ isCheckingAuth:false })
        }
     }
})
)