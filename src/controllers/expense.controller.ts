import { Request, Response, NextFunction } from "express";
import { expenseSchema } from "../utils/schemas";
import { convertZodEror } from "../utils/helpers";
import ExpenseModel from "../models/expense.model";

async function addExpense(req: Request, res: Response, next: NextFunction) {
  try {
    // @ts-ignore
    const userId = req.user;
    const { body } = req;
    const { success, error, data } = expenseSchema.safeParse(body);
    if (!success) {
      return res.status(400).json({
        error: convertZodEror(error),
      });
    }
    await ExpenseModel.create({
      amount: data.amount,
      category: data.category,
      description: data.description || "",
      name: data.name,
      userId,
    });
    return res.status(201).json({
      message: "Expense Added",
    });
  } catch (error) {
    next(error);
  }
}

export default addExpense;
