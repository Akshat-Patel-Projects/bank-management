import Big from 'big.js';

import Account from '../models/Account.js';
import Transaction from '../models/Transaction.js';

const DAILY_DEPOSIT_LIMIT = 10000; // Max deposit per day
const DAILY_WITHDRAWAL_LIMIT = 2000; // Max withdrawal per day
const DAILY_TRANSFER_LIMIT = 5000; // Max transfer per day

// Helper function to check daily transaction limits
const checkDailyLimit = async (userId, amount, type) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalToday = await Transaction.aggregate([
    { $match: { fromAccount: userId, transactionType: type, transactionDate: { $gte: today } } },
    { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
  ]);

  const totalAmountToday = totalToday.length > 0 ? totalToday[0].totalAmount : 0;
  
  let limit;
  if (type === "deposit") limit = DAILY_DEPOSIT_LIMIT;
  else if (type === "withdraw") limit = DAILY_WITHDRAWAL_LIMIT;
  else if (type === "transfer") limit = DAILY_TRANSFER_LIMIT;
  
  return totalAmountToday + amount > limit;
};

// **Deposit Money**
const depositMoney = async (req, res) => {
  const { accountNumber, amount } = req.body;
  const userId = req.user.id;

  try {
    const account = await Account.findOne({ accountNumber, user: userId });
    if (!account) return res.status(404).json({ message: "Account not found or not owned by the user" });

    if (await checkDailyLimit(account._id, amount, "deposit")) {
      return res.status(400).json({ message: "Daily deposit limit exceeded" });
    }

    account.balance = new Big(account.balance).plus(amount).toString();
    await account.save();

    const transaction = new Transaction({
      fromAccount: account._id,
      amount,
      transactionDate: new Date(),
      status: "completed",
      transactionType: "deposit",
    });

    await transaction.save();

    res.status(200).json({ message: "Deposit successful", account });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// **Withdraw Money**
const withdrawMoney = async (req, res) => {
  const { accountNumber, amount } = req.body;
  const userId = req.user.id;

  try {
    const account = await Account.findOne({ accountNumber, user: userId });
    if (!account) return res.status(404).json({ message: "Account not found or not owned by the user" });

    if (await checkDailyLimit(account._id, amount, "withdraw")) {
      return res.status(400).json({ message: "Daily withdrawal limit exceeded" });
    }

    if (new Big(account.balance).lt(amount)) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    account.balance = new Big(account.balance).minus(amount).toString();
    await account.save();

    const transaction = new Transaction({
      fromAccount: account._id,
      amount,
      transactionDate: new Date(),
      status: "completed",
      transactionType: "withdraw",
    });

    await transaction.save();

    res.status(200).json({ message: "Withdrawal successful", account });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// **Transfer Money**
const transferMoney = async (req, res) => {
  const { fromAccountNumber, toAccountNumber, amount, description } = req.body;

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const fromAccount = await Account.findOne({ accountNumber: fromAccountNumber, user: req.user.id });
    if (!fromAccount) {
      return res.status(403).json({ message: "Unauthorized: Account does not belong to you or not found" });
    }

    const toAccount = await Account.findOne({ accountNumber: toAccountNumber });
    if (!toAccount) {
      return res.status(404).json({ message: "Receiver account not found" });
    }

    if (await checkDailyLimit(fromAccount._id, amount, "transfer")) {
      return res.status(400).json({ message: "Daily transfer limit exceeded" });
    }

    // Calculate the transaction fee (e.g., 1%)
    const TRANSACTION_FEE_PERCENTAGE = 0.01;  // You can change this percentage
    const transactionFee = new Big(amount).times(TRANSACTION_FEE_PERCENTAGE);

    // Format the transaction fee with 2 decimal places and currency sign
    const formattedFee = transactionFee.toFixed(2);  // Keeps 2 decimals
    const formattedFeeWithCurrency = `$${formattedFee}`;  // Adding currency symbol

    // Check if the sender has enough balance for both the amount and the fee
    const totalAmount = new Big(amount).plus(transactionFee);
    if (new Big(fromAccount.balance).lt(totalAmount)) {
      return res.status(400).json({ message: "Insufficient balance, including transaction fee" });
    }

    // Deduct the total amount (amount + fee) from the sender's balance
    fromAccount.balance = new Big(fromAccount.balance).minus(totalAmount).toString();

    // Add the transfer amount to the receiver's balance
    toAccount.balance = new Big(toAccount.balance).plus(amount).toString();

    await fromAccount.save();
    await toAccount.save();

    // Create the transaction record
    const transaction = new Transaction({
      fromAccount: fromAccount._id,
      toAccount: toAccount._id,
      amount,
      transactionFee: formattedFee,  // Save the formatted fee
      transactionDate: new Date(),
      status: "completed",
      transactionType: "transfer",
      description: description || 'Transfer between accounts',
    });

    await transaction.save();

    res.status(200).json({
      message: `Transfer completed. Transfer fee of ${formattedFeeWithCurrency} charged.`,
      transactionID: transaction._id,
      status: transaction.status,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};




// **Get Transaction History**
// Updated transactionController.js
const getTransactionHistory = async (req, res) => {
  const { accountNumber } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const account = await Account.findOne({ accountNumber });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const transactions = await Transaction.find({
      $or: [{ fromAccount: account._id }, { toAccount: account._id }],
    })
      .sort({ transactionDate: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export { depositMoney, getTransactionHistory, transferMoney, withdrawMoney };
