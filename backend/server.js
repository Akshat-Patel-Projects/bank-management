import cors from 'cors';
import dotenv from 'dotenv';
// Updated server.js
import express from 'express';
import helmet from 'helmet'; // Import helmet
import mongoose from 'mongoose';
import morgan from 'morgan';

import accountRoute from './routes/accountRoute.js';
import transactionRoute from './routes/transactionRoute.js';
import userRoute from './routes/userRoute.js';

dotenv.config();
console.log("Resend API Key:", process.env.RESEND_API_KEY); // Debugging
console.log("MongoDB URI:", process.env.MONGO_URI ? "Loaded" : "Not Loaded");
const app = express();

// Middleware
app.use(helmet()); // Use helmet for security
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRoute);
app.use("/api/accounts", accountRoute);
app.use("/api/transactions", transactionRoute);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
