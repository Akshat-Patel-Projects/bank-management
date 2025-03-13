import cors from 'cors';
import dotenv from 'dotenv';
// 1. Import dependencies
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import accountRoute from './routes/accountRoute.js';
import transactionRoute from './routes/transactionRoute.js';
import userRoute from './routes/userRoute.js';

// 2. Load environment variables
dotenv.config();

// 3. Initialize Express app
const app = express();

// 4. Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// 5. Routes
app.use("/api/users", userRoute);
app.use("/api/transactions", transactionRoute);
app.use("/api/accounts", accountRoute);
// 6. Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://akshatpat3l:Jq15GAayffjxtqKx@bank.3y4aj.mongodb.net/bankDB?retryWrites=true&w=majority&appName=Bank"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// 6. Default route
app.get("/", (req, res) => {
  res.send("Bank Management API is running...");
});

// 7. Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
