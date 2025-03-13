import express from 'express';

import {
  depositMoney,
  getTransactionHistory,
  transferMoney,
  withdrawMoney,
} from '../controllers/transactionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

//Post: Deposit Money Request
router.post("/deposit", authMiddleware,depositMoney);

//Post: Withdraw Money Request
router.post("/withdraw", authMiddleware,withdrawMoney);

//POST: Transfer Money Request
router.post("/transfer", authMiddleware,transferMoney);

//GET: Get Transaction History
router.get('/history/:accountNumber', authMiddleware, getTransactionHistory);
export default router;
