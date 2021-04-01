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

router.route('/').get(getAllTodos).post(addTodos);

router.route('/user-todos').get(protect, getUserTodos);

router.route('/:id').delete(deleteTodos).put(toggleTodos);

export default router;
