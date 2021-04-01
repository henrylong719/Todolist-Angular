import express from 'express';

const router = express.Router();

import { protect, admin } from '../middleware/authMiddleware.js';

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserById,
} from '../controllers/userController.js';

router.route('/login').post(authUser);

router.route('/register').post(registerUser);

// get and or update current login user's profile
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/').get(protect, admin, getAllUsers);

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser)
  .get(protect, admin, getUserById);

export default router;
