import express from 'express';

const router = express.Router();

import { protect, admin } from '../middleware/authMiddleware.js';

import {
  addTodos,
  deleteTodos,
  getAllTodos,
  getUserTodos,
  toggleTodos,
} from '../controllers/todoController.js';

// get all todos (admin)
router.route('/admin/todo-list').get(protect, admin, getAllTodos);

// get or post individual todos (user)
router.route('/user-todos').get(protect, getUserTodos).post(protect, addTodos);

// delete or put individual todos (user)
router.route('/user-todos/:id').delete(deleteTodos).put(toggleTodos);

export default router;
