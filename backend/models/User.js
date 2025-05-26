import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
  dailyTransferTotal: { type: Number, default: 1000 },
  role: { type: String, enum: ['admin', 'customer', 'manager'], default: 'customer' },
  isVerified: { type: Boolean, default: false }, // Added field
  verificationToken: { type: String, default: null }, // Store token
});

const User = mongoose.model("User", userSchema);
export default User;