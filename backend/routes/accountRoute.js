import express from 'express';

import {
  createAccount,
  getAccountDetails,
} from '../controllers/accountController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

//Post: Create Account
router.post('/create', authMiddleware,createAccount);


// GET: Fetch Logged-in User's Account
router.get('/me', authMiddleware, getAccountDetails);
export default router;