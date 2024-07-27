import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import addExpense from "../controllers/expense.controller";

const expenseRouter = Router();
expenseRouter.use(isAuthenticated);
expenseRouter.post("/", addExpense);

export default expenseRouter;
