import express from 'express';

import {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserContactInfo,
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

// POST: Register a new user
router.post('/signup', registerUser);

// POST: Login user
router.post('/login', loginUser);


// GET: Fetch logged-in user details
router.get('/me', authMiddleware, getUserProfile);

// Example of admin-only route
router.get('/admin-dashboard', authMiddleware, roleMiddleware(['admin']), (req, res) => {
  res.status(200).json({ message: 'Welcome to the admin dashboard' });
});

// Example of manager-only route
router.get('/manager-dashboard', authMiddleware, roleMiddleware(['manager', 'admin']), (req, res) => {
  res.status(200).json({ message: 'Welcome to the manager dashboard' });
});

// PUT: Update email and phone number
router.put('/update-contact', authMiddleware, updateUserContactInfo);




export default router;
