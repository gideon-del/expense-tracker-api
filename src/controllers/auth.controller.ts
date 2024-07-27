import { Request, Response } from "express";
import { registerSchema } from "../utils/schemas";
import { convertZodEror, hashPassword } from "../utils/helpers";
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

export { registerUser };
