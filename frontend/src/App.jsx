import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'

const App = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
           <Route path='/' element={<HomePage/>}/>
           <Route path='/login' element={<LoginPage/>}/>
           <Route path='/signup' element={<SignupPage/>}/>
           <Route path='/profile' element={<ProfilePage/>}/>
           <Route path='/settings' element={<SettingsPage/>}/>
        </Routes>
    </div>
  )
}

export default App