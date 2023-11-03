import path from 'node:path';

import cors from 'cors';
import env from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';

import { configPassport } from './config/passport.js';
import { __dirname } from './utils/url.js';

import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import authRoutes from './routes/auth.js';

env.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());
app.use('/orders', express.static(path.resolve(__dirname, 'data/orders')));

configPassport();

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/auth', authRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    message: `Page not found. ${req.originalUrl} is not a valid url!`,
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  const status = error.status || 500;
  const message = error.message || 'An error occurred.';
  const payload = error.data || [];

  res.status(status).json({ message, payload });
});

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MONGO connection success!');

    app.listen(PORT, () => console.log('Server is running!'));
  } catch (error) {
    console.log('ERROR: ', error);
    process.exit(1);
  }
})();
