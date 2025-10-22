import express from 'express'
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
import messageRoutes from './routes/message.route.js'
import cors from 'cors'
import { app,server,io } from './lib/socket.js'

dotenv.config()

const port = process.env.PORT || 5001

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json({limit:'10mb'}))
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)


server.listen(port,()=>{
    console.log(`Server is running on port: ${port}`)
    connectDB()
})