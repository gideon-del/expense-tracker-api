import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../utils/schemas";
import {
  comparePassword,
  convertZodEror,
  generateToken,
  hashPassword,
} from "../utils/helpers";
import UserModel from "../models/user.model";
async function registerUser(req: Request, res: Response) {
  const { body } = req;
  const { error, success, data: userDetails } = registerSchema.safeParse(body);

  if (!success) {
    return res.status(400).json({
      error: convertZodEror(error),
    });
  }

  const existingUser = await UserModel.findUserWithEmail(userDetails.email);
  if (existingUser) {
    return res.status(400).json({
      error: "User already exists",
    });
  }
  const hashedPassword = hashPassword(userDetails.password);
  await UserModel.create({
    ...userDetails,
    password: hashedPassword,
  });
  return res.status(201).json({
    message: "Account created",
  });
}
async function loginUser(req: Request, res: Response) {
  const { body } = req;
  const { success, error, data: userDetails } = loginSchema.safeParse(body);
  if (!success) {
    return res.status(400).json({
      error: convertZodEror(error),
    });
  }
  const user = await UserModel.findUserWithEmail(userDetails.email);
  if (!user) {
    return res.status(400).json({
      error: "Account not available",
    });
  }
  const passwordIsCorrect = comparePassword(
    userDetails.password,
    user.password
  );
  if (!passwordIsCorrect) {
    return res.status(400).json({
      error: "Incorrect password",
    });
  }

  const tokens = generateToken(JSON.stringify(user._id));
  return res.status(200).json({
    ...tokens,
  });
}
export { registerUser, loginUser };
