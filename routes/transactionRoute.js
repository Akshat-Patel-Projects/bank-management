import express from 'express';

import {
  depositMoney,
  withdrawMoney,
} from '../controllers/transactionController.js';

const router = express.Router();

//Post: Deposit Money Request
router.post('/deposit', depositMoney)

//Post: Withdraw Money Request
router.post('/withdraw', withdrawMoney)

export default router;