import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import todos from './data/todo.js';
import users from './data/user.js';
import Todo from './models/todoModel.js';
import User from './models/userModel.js';
import connectDB from './config/db.js';

// for .env
dotenv.config();

connectDB();

const importData = async () => {
  try {
    // clean up all data
    await User.deleteMany();
    await Todo.deleteMany();

    const createUser = await User.insertMany(users);

    const adminUser = createUser[0]._id;

    const sampleTodos = todos.map((todo) => {
      return { ...todo, user: adminUser };
    });

    await Todo.insertMany(sampleTodos);
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
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
