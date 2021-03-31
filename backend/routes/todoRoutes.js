import express from 'express';

const router = express.Router();

import {
  addTodos,
  deleteTodos,
  getAllTodos,
  toggleTodos,
} from '../controllers/todoController.js';

router.route('/').get(getAllTodos).post(addTodos);

router.route('/:id').delete(deleteTodos).put(toggleTodos);

export default router;
