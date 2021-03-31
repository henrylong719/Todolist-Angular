import Todo from '../models/todoModel.js';

// $desc   Get all todos
// @route  GET /api/todos
// @access Public

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});

    return res.status(200).json({ todos });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};

export { getAllTodos };
