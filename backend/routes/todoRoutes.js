import express from 'express';

const router = express.Router();

import { getAllTodos } from '../controllers/todoController.js';

router.route('/').get(getAllTodos);

export default router;
