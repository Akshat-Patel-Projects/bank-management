import express from 'express';

import {
  loginUser,
  registerUser,
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

// POST: Register a new user
router.post('/signup', registerUser);

// POST: Login user
router.post('/login', loginUser);

// Example of admin-only route
router.get('/admin-dashboard', authMiddleware, roleMiddleware(['admin']), (req, res) => {
  res.status(200).json({ message: 'Welcome to the admin dashboard' });
});

// Example of manager-only route
router.get('/manager-dashboard', authMiddleware, roleMiddleware(['manager', 'admin']), (req, res) => {
  res.status(200).json({ message: 'Welcome to the manager dashboard' });
});

export default router;
