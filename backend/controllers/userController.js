// Updated userController.js
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import {
  body,
  validationResult,
} from 'express-validator';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import {
  createAccount,
} from './accountController.js'; // Import createAccount function

const registerUser = [
  body("firstName").isLength({ min: 1 }).withMessage("First name is required"),
  body("lastName").isLength({ min: 1 }).withMessage("Last name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("phone").isMobilePhone().withMessage("Invalid phone number"),
  body("role")
    .optional()
    .isIn(["admin", "customer", "manager"])
    .withMessage("Invalid role"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, phone, role } = req.body;

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const verificationToken = crypto.randomBytes(32).toString("hex");

      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        role: role || "customer",
        isVerified: false, // User is not verified yet
        verificationToken,
      });

      await user.save();

      // Create the account with user's details
      const accountData = {
        userID: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        initialDeposit: 1000,
        accountType: "savings",
      };

      // Send verification email
      await sendVerificationEmail(user.email, verificationToken);

      const accountResult = await createAccount(accountData);

      

      res.status(201).json({
        message: "User registered successfully. Please verify your email.",
        user,
        account: accountResult.account,
      });
    } catch (error) {
      console.error("Error in registerUser:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
];

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the user has verified their email
    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email before logging in." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserContactInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email, phone } = req.body;

    // Check if at least one field is provided
    if (!email && !phone) {
      return res
        .status(400)
        .json({
          message: "Please provide an email or phone number to update.",
        });
    }

    // Ensure email is unique if it's being updated
    if (email) {
      const emailExists = await User.findOne({ email, _id: { $ne: userId } });
      if (emailExists) {
        return res.status(400).json({ message: "Email is already in use." });
      }
    }

    // Build update object dynamically
    const updateFields = {};
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;

    const user = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({
      message: "Contact information updated successfully.",
      user: { email: user.email, phone: user.phone },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    user.isVerified = true; // Mark user as verified
    user.verificationToken = null; // Remove the token after verification
    await user.save();

    res.json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserContactInfo,
  verifyEmail,
};
