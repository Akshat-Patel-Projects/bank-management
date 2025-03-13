import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
  dailyTransferTotal: { type: Number, default: 1000 },
  role: {
    type: String,
    enum: ['admin', 'customer', 'manager'],  // Define roles here
    default: 'customer',  // Default role for new users
  }
});

const User = mongoose.model("User", userSchema);
export default User;
