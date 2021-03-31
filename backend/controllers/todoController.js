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
      error: 'Server Error',
    });
  }
};

// $desc add todos
// @route POST /api/todos
// @access Public

const addTodos = async (req, res) => {
  try {
    const { title } = req.body;

    const todo = await Todo.create({
      title,
    });

    return res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// $desc delete todos
// @route DELETE /api/todos/:id
// @access Public

const deleteTodos = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: 'No todo found',
      });
    }

    await todo.remove();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// $desc toggle todos
// route PUT /api/todos/:id
// @access Public

const toggleTodos = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    console.log(todo);

    if (todo) {
      todo.completed = !todo.completed;

      const toggledTodo = await todo.save();

      return res.status(200).json({
        success: true,
        data: toggledTodo,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

export { getAllTodos, addTodos, deleteTodos, toggleTodos };
