import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer'
import {fileURLToPath} from 'url'
import path from 'path'
import UserRoutes from './Routes/User.js'
import TaskRoutes from './Routes/Task.js'
import { Register } from './Controllers/User.js'
//import Task from './models/Task.js'
//import tasks from './data/tasks.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(cors({origin:'http://localhost:3000', credentials: true}))
app.use(cookieParser())

app.use('/assets', express.static(path.join(__dirname , 'public/assets')))

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'public/assets')
  },
  filename: function(req, file, cb){
    const pisturePath = new Date().toISOString().replace(/:/g , '-') + file.originalname
    req.body.picturePath = pisturePath
    cb(null, pisturePath)
  },
})

const upload = multer({storage})

app.use('/auth/register', upload.single('picture'), Register)
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
    //Task.insertMany(tasks) --> for check url in postman
    console.log(`The app is running on the PORT: ${PORT}`)
  })
}).catch((err) =>{
  console.log(err)
})  