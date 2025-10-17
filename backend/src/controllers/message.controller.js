import User from "../models/user.model.js"

export const getUsersForSidebar =async (req,res)=>{
    try {
        const loggedInUser = req.user._id
        const filteredUsers = await User.find({$ne:loggedInUser}).select("-password")
        return res.status(201).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUsersForSidebar controller",error.message)
        return res.status(500).json({ message:"Internal server error" })
    }
}