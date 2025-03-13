import Account from '../models/Account.js';
import User from '../models/User.js';

const generateAccountNumber = () => {
  return "ACCT" + Math.floor(100000 + Math.random() * 900000);
};

const createAccount = async (req, res) => {
  const { userID, initialDeposit, accountType } = req.body;

  try {
    const user = await User.findById(userID);
    if (!user) return res.status(404).json({ message: "User not found" });

    const accountNumber = generateAccountNumber();

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

    res.status(201).json({ message: "Account Created Successfully", account });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export { createAccount };