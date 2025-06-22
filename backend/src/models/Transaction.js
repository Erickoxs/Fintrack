import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const transactionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['ingreso', 'gasto'], required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  date: { type: Date, default: Date.now }
});

export const Transaction = model('Transaction', transactionSchema);
