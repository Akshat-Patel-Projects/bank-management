import Account from '../models/Account.js';

// Controller to deposit money into an account
const depositMoney = async (req, res) => {
  const { accountNumber, amount } = req.body;

  try {
    // Find the account by account number
    const account = await Account.findOne({ accountNumber });
    if (!account) return res.status(404).json({ message: "Account not found" });

    // Add the deposit amount to the balance
    account.balance += amount;
    await account.save();

    res.status(200).json({ message: "Deposit successful", account });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Controller to withdraw money from an account
const withdrawMoney = async (req, res) => {
  const { accountNumber, amount } = req.body;

  try {
    // Find the account by account number
    const account = await Account.findOne({ accountNumber });
    if (!account) return res.status(404).json({ message: "Account not found" });

    // Check if balance is sufficient
    if (account.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Deduct the withdrawal amount from the balance
    account.balance -= amount;
    await account.save();

    res.status(200).json({ message: "Withdrawal successful", account });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export { depositMoney, withdrawMoney };
