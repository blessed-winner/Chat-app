import express from 'express'
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
import messageRoutes from './routes/message.route.js'
import cors from 'cors'
import { app,server,io } from './lib/socket.js'
import path from 'path'
import helmet from 'helmet';

dotenv.config()

const port = process.env.PORT || 5001
const __dirname = path.resolve()

console.log("Serving frontend from:", path.join(__dirname, "../frontend/dist"));

app.use(helmet())
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "ws://localhost:5001", "http://localhost:5173"]
    }
  })
);
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json({limit:'10mb'}))
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

server.listen(port,()=>{
    console.log(`Server is running on port: ${port}`)
    connectDB()
})