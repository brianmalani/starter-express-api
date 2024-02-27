require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

// Middleware
app.use(express.json());

// Routes
const categoryRoutes = require('./routes/categories');
const orderRoutes = require('./routes/orders');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');

app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Connect to the database before listening
connectDB().then(() => {
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
