// Updated accountController.js
import {
  body,
  validationResult,
} from 'express-validator';

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

const createAccount = [
  validateCreateAccount,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userID, initialDeposit, accountType } = req.body;

    // Log the user ID to ensure it's correct

    try {
      const user = await User.findById(userID);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const accountNumber = generateAccountNumber();
      console.log("Generated account number:", accountNumber); // Log the generated account number

      const account = new Account({
        user: user._id,
        accountNumber,
        balance: initialDeposit,
        accountType: accountType,
        status: "active",
      });

      await account.save();

      user.accounts.push(account._id);
      await user.save();

      res
        .status(201)
        .json({ message: "Account Created Successfully", account });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  },
];

export { createAccount };
