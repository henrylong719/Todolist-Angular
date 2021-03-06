import User from '../models/userModel.js';
import Todo from '../models/todoModel.js';
import generateToken from '../utils/generateToken.js';

// $desc  Get Auth user & get Token
// $route POST/api/users/login
// @access Public

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        expiresIn: +process.env.TOKEN_EXPIRESIN / 1000, // 7200 s
      });
    } else {
      // 401 unauthorized
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// $desc     Auth user & get token
// $route    POST /api/users/register
// $access   Public

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      // 400: bad request
      return res.status(400).json({
        success: false,
        error: 'Email already exists',
      });
    }

    // create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        expiresIn: +process.env.TOKEN_EXPIRESIN / 1000,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: 'invalid user data',
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// $desc: Get user profile
// @route GET /api/users/profile
// @access private

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      return res.status(404).json('User not found');
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// $desc: update user profile
// @route PUT /api/users/profile
// @access private

const updateUserProfile = async (req, res) => {
  try {
    // 1. find the user in the database

    const user = await User.findById(req.user._id);

    // 2. compare user info from data base and user info from body

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updateUser = await user.save();

      return res.status(200).json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id),
        expiresIn: +process.env.TOKEN_EXPIRESIN / 1000,
      });
    } else {
      res.status(404).json({ message: 'user not found' });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error  Invalid Email',
    });
  }
};

// $desc: get all users
// @route: GET api/users/admin/user-list
// @access: admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    return res.status(200).json({ data: users });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// $desc delete user
// @route DELETE api/users/admin/user-list/:id
// @access: admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      let todos = await Todo.find({ user: user._id });

      // remove all todos related to the user
      todos.map(async (todo) => {
        await Todo.findById(todo._id).remove();
      });

      await user.remove();

      return res.status(200).json({ message: 'user removed' });
    } else {
      return res.status(404).json({ message: 'user not found' });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// $desc update user
// @route PUT api/users/admin/user-list/:id
// @access admin

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;

      // if password exists in the request body (password in the database is already hashed)
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      return res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      return res.status(404).json({ message: 'user not found' });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// $desc update user
// @route GET api/users/admin/user-list/:id
// @access admin

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      return res.status(404).json('User not found');
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserById,
};
