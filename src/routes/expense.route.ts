import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import {
  addExpense,
  getAllExpense,
  updateExpense,
} from "../controllers/expense.controller";

const expenseRouter = Router();
expenseRouter.use(isAuthenticated);
expenseRouter.get("/", getAllExpense);
expenseRouter.post("/", addExpense);
expenseRouter.put("/:expenseId", updateExpense);

export default expenseRouter;
