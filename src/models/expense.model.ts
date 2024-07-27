import { Schema, model } from "mongoose";

const expenseSchema = new Schema({
  category: {
    type: String,
    required: true,
    enum: [
      "Groceries",
      "Leisure",
      "Electronics",
      "Utilities",
      "Clothing",
      "Health",
      "Others",
    ],
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: String,
    required: true,
  },
  description: String,
});

const ExpenseModel = model("Expense", expenseSchema);

export default ExpenseModel;
