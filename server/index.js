import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// LiqPay setup
const LiqPay = require('liqpay');

dotenv.config();
const app = express();

// Constanta
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

// LiqPay API route
const liqpay = new LiqPay(process.env.LIQPAY_PUBLIC, process.env.LIQPAY_PRIVATE);

app.post('/api/create-payment', (req, res) => {
  const { amount, user } = req.body;

  const html = liqpay.cnb_form({
    action: "pay",
    amount,
    currency: "UAH",
    description: `Підписка для ${user}`,
    order_id: `sub-${Date.now()}`,
    version: "3",
    result_url: "http://localhost:3000/success",
    server_url: "http://your-server.com/api/payment-callback"
  });

  res.send({ html });
});

// MongoDB + запуск сервера
async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.c9rec.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&tls=true&appName=Cluster0`
    );
    app.listen(PORT, () => console.log(`✅ Server started on port: ${PORT}`));
  } catch (error) {
    console.log('❌ DB connection error:', error);
  }
}

start();
