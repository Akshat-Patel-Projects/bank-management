// Updated transactionModel.js
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionFee: {
    type: Number,
    default: 0, // This will be set dynamically during the transfer
  },
  transactionDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'failed'],
    required: true,
  },
  transactionType: {
    type: String,
    enum: ['deposit', 'withdrawal', 'transfer'],
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
