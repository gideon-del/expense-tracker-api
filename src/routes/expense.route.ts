import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import { addExpense, updateEvent } from "../controllers/expense.controller";

const expenseRouter = Router();
expenseRouter.use(isAuthenticated);
expenseRouter.post("/", addExpense);
expenseRouter.put("/:expenseId", updateEvent);

export default expenseRouter;
