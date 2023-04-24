import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import multer from 'multer'
import {fileURLToPath} from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(cors())
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

dotenv.config()
const PORT =  process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`The app is running on the PORT: ${PORT}`)
  })
}).catch((err) =>{
  console.log(err)
})  