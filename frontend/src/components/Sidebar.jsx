import React from 'react'
import { useChatStore } from '../store/useChatStore'

const Sidebar = () => {
    const { selectedUser,getUsers,setSelectedUser,users,isUsersLoading } = useChatStore()
    const onlineUsers = []
    useEffect(()=>{
        getUsers()
    },[getUsers])
    if(isUsersLoading) return <SidebarSkeleton/>
  return (
    <div>Sidebar</div>
  )
}

export default Sidebar