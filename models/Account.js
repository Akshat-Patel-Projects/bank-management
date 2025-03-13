import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  accountType: {
    type: String,
    enum: ["checking", "savings"],
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);
export default Account;
