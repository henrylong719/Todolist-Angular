import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import colors from 'colors';
import cors from 'cors';

import todoRoutes from './routes/todoRoutes.js';
import userRoutes from './routes/userRoutes.js';

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

// allow angular access node server
// Set up CORS
app.use(
  cors({
    origin: true, // "true" will copy the domain of the request back
    // to the reply. If you need more control than this
    // use a function.

    credentials: true, // This MUST be "true" if your endpoint is
    // authenticated via either a session cookie
    // or Authorization header. Otherwise the
    // browser will block the response.

    methods: 'POST,GET,PUT,OPTIONS,DELETE', // Make sure you're not blocking
    // pre-flight OPTIONS requests
  })
);

// anything goes to the /api/todos, link to the todoRoutes
app.use('/api/todos', todoRoutes);

// anything goes to the /api/users, link to the userRoutes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('app is running');
});

const PORT = process.env.PORT | 5000;

app.listen(
  5000,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode  on port ${PORT}`.green.bold
  )
);
