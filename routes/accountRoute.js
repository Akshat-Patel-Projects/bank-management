import express from 'express';

import { createAccount } from '../controllers/accountController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

//Post: Create Account
router.post('/create', authMiddleware,createAccount);

export default router;