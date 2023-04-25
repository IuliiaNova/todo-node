import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import UserRoutes from './Routes/User.js'
import TaskRoutes from './Routes/Task.js'
import { Register } from './Controllers/User.js'

const app = express()

app.use(express.json())
app.use(cors({origin:'http://localhost:3000', credentials: true}))
app.use(cookieParser())


app.use('/auth/register', Register)
app.use('/auth', UserRoutes)
app.use('/task', TaskRoutes)
app.use('/', (req, res) => {
  res.send('This is a correct response')
})


dotenv.config()

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Ooops, something wrong'
  return res.status(status).json({message})
})


const PORT =  process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`The app is running on the PORT: ${PORT}`)
  })
}).catch((err) =>{
  console.log(err)
})  