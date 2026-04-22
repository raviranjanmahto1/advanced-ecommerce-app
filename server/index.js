const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const seedRoutes = require('./routes/seedRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://advanced-ecommerce-app-raviranjan.vercel.app', 'https://advanced-ecommerce-app-admin-raviranjan.vercel.app'],
  credentials: true
}));

app.get('/', (req, res) => { res.send('API is running...'); });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/seed', seedRoutes);

app.use(notFound);
app.use(errorHandler);

// MongoDB connection - just mock or connect if possible but continue
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Connection Error: ', err.message));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Handle uncaught exceptions and unhandled rejections globally
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

module.exports = app;
