// models/Account.js

import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  accountType: {
    type: String,
    enum: ['savings', 'checking', 'business'],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Account = mongoose.model('Account', accountSchema);
export default Account;
