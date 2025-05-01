import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
// import userRoutes from './routes/users.js'

dotenv.config()

const app = express()

// Constanta
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Middleware
app.use(cors()) // Дозволяє запити з інших доменів
app.use(fileUpload()) // Для завантаження файлів
app.use(express.json()) // Парсить JSON з тіла запиту
app.use(express.static('uploads')) // Віддає файли з папки uploads


// Routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
// app.use('/api/users', userRoutes)

// MongoDB + запуск сервера
async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.c9rec.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&tls=true&appName=Cluster0`,
    )

    app.listen(PORT, () => console.log(`✅ Server started on port: ${PORT}`))
  } catch (error) {
    console.log('❌ DB connection error:', error)
  }
}
start()
