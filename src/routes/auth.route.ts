import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";

const authRoute = Router();

authRoute.post("/register", registerUser);

export default authRoute;
