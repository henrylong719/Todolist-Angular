import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import colors from 'colors';
import todoRoutes from './routes/todoRoutes.js';

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

// allow angular access node.js localhost
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Header',
    'Origin,X-Requested-With, Content-Type,Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PATCH,DELETE,PUT,OPTIONS'
  );
  next();
});

// anything goes to the /api/todos, link to the todoRoutes
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send('app is running');
});

const PORT = process.env.PORT | 5000;

app.listen(
  5000,
  console.log(`Server running in ${process.env.NODE_ENV} mode  on port ${PORT}`)
);
