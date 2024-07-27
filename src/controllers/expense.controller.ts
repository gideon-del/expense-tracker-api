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
async function updateEvent(req: Request, res: Response) {
  //@ts-ignore
  const { userId } = req.user;

  const { expenseId } = req.params;
  const { body } = req;
  const {
    success,
    error,
    data: expenseDetails,
  } = expenseSchema.safeParse(body);
  if (!success) {
    return res.status(400).json({
      error: convertZodEror(error),
    });
  }
  console.log(expenseId, req.query, req.params);
  const updatedExpense = await ExpenseModel.findByIdAndUpdate(
    expenseId,
    {
      name: expenseDetails.name,
      category: expenseDetails.category,
      amount: expenseDetails.amount,
      userId,
      updatedAt: Date.now(),
    },
    {
      projection: {
        _id: 0,
        __v: 0,
      },
    }
  );
  if (!updatedExpense) {
    return res.status(404).json({
      message: "Expense not found",
    });
  }

  return res.status(200).json({
    message: "Expense updated",
  });
}
export { addExpense, updateEvent };
