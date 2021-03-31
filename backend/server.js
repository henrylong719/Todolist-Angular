import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('app is running');
});

const PORT = process.env.PORT | 5000;

app.listen(
  5000,
  console.log(`Server running in ${process.env.NODE_ENV} mode  on port ${PORT}`)
);
