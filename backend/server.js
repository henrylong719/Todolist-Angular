import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import colors from 'colors';

dotenv.config();

const app = express();

// morgan middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// for parsing body information in the incoming POST request
app.use(express.json());

// connect database
connectDB();

app.get('/', (req, res) => {
  res.send('app is running');
});

const PORT = process.env.PORT | 5000;

app.listen(
  5000,
  console.log(`Server running in ${process.env.NODE_ENV} mode  on port ${PORT}`)
);
