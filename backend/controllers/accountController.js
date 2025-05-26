// Updated accountController.js
import { body } from 'express-validator';

import Account from '../models/Account.js';
import User from '../models/User.js';

const generateAccountNumber = () => {
  return "ACCT" + Math.floor(100000 + Math.random() * 900000);
};

const validateCreateAccount = [
  body("userID").isMongoId().withMessage("Invalid user ID"),
  body("initialDeposit").isNumeric().withMessage("Deposit must be a number"),
  body("accountType")
    .isIn(["savings", "checking", "business"])
    .withMessage("Invalid account type"),
];

const createAccount = async (accountData) => {
  if (!accountData.userID || !accountData.initialDeposit || !accountData.accountType) {
    throw new Error("Missing required account data (userID, initialDeposit, accountType)");
  }

  console.log('Account data received:', accountData);

  try {
    const user = await User.findById(accountData.userID);
    if (!user) {
      throw new Error('User not found');
    }

    const accountNumber = generateAccountNumber();
    const account = new Account({
      user: user._id,
      accountNumber,
      balance: accountData.initialDeposit,
      accountType: accountData.accountType,
      status: 'active',
      firstName: user.firstName, // Add first name
      lastName: user.lastName,   // Add last name
      email: user.email,         // Add email
      phone: user.phone,         // Add phone
    });

    await account.save();

    user.accounts.push(account._id);
    await user.save();

    return { account };
  } catch (error) {
    console.error("Error in createAccount:", error.message);
    throw new Error(`Error creating account: ${error.message}`);
  }
};

const getAccountDetails = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from authMiddleware

    const account = await Account.findOne({ user: userId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({
      firstName: account.firstName,
      lastName: account.lastName,
      balance: account.balance,
      accountType: account.accountType,
      accountNumber: account.accountNumber,
      status: account.status,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { createAccount, getAccountDetails };
