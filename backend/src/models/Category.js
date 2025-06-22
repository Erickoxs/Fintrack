import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true }
});

export const Category = model('Category', categorySchema);
