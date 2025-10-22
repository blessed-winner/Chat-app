import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {
  const { authUser,checkAuth, isCheckingAuth,onlineUsers } = useAuthStore()
  const{theme} = useThemeStore()

  console.log("Online Users:",onlineUsers)

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log(authUser)

  if(isCheckingAuth && !authUser){
         return ( 
         <div className='flex h-screen items-center justify-center'>
          <Loader className='size-10 animate-spin'/>
         </div>
         );
        }
       
  return (
    <div data-theme={theme}>
       <Navbar/>
        <Routes>
           <Route path='/' element={authUser ? <HomePage/> : <LoginPage/>}/>
           <Route path='/login' element={!authUser ? <LoginPage/> : <HomePage/>}/>
           <Route path='/signup' element={!authUser ? <SignupPage/> : <HomePage/>}/>
           <Route path='/profile' element={authUser ? <ProfilePage/> : <LoginPage/>}/>
           <Route path='/settings' element={<SettingsPage/>}/>
        </Routes>
        <Toaster/>
    </div>
  )
}

export default App