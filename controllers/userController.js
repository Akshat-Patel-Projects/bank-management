import bcrypt from 'bcryptjs';

import User from '../models/User.js';

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'User already exists.' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Correct way of exporting in ES modules
export { registerUser };
