import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    toAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },fromAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    transactionDate:{
        type: Date,
        required: true,
    },
    status:{
        type: String,
        enum: ['completed', 'pending', 'failed'],
        required: true,
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;