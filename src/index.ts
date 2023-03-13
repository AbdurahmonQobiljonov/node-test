import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import {userRouter} from './routes/user'
import {postRouter} from './routes/post'
import http from 'http'

dotenv.config()

if(!process.env.PORT){
  process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)

const app = express()
app.use(cors)
app.use(express.json())
app.use('/api/users',userRouter)
app.use('/api/users',postRouter)

const server = http.createServer(app)
server.listen(PORT, ()=>{
  console.log(`listening port ${PORT}`); 
})