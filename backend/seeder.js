import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import todos from './data/todo.js';
import Todo from './models/todoModel.js';
import connectDB from './config/db.js';

// for .env
dotenv.config();

connectDB();

const importData = async () => {
  try {
    // clean up all data
    await Todo.deleteMany();

    await Todo.insertMany(todos);
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Todo.deleteMany();
    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
