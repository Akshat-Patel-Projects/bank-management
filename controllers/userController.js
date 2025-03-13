// Updated userController.js
import bcrypt from 'bcryptjs';
import {
  body,
  validationResult,
} from 'express-validator';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

const registerUser = [
  // Validation rules
  body('firstName').isLength({ min: 1 }).withMessage('First name is required'),
  body('lastName').isLength({ min: 1 }).withMessage('Last name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').isMobilePhone().withMessage('Invalid phone number'),
  body('role').optional().isIn(['admin', 'customer', 'manager']).withMessage('Invalid role'),  // Validate role

  // Controller logic
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, phone, role } = req.body;

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user with role or default to 'customer'
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        role: role || 'customer',  // Default to 'customer' if no role is provided
      });

      await user.save();
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  },
];


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate access and refresh tokens
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.json({ accessToken, refreshToken });
};

export { loginUser, registerUser };
