//ts-off
import { Response, Request, NextFunction } from "express";
import { verifyToken } from "../utils/helpers";
import { JwtPayload } from "jsonwebtoken";

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }
    const token = authorization.slice(7);
    if (token.trim().length === 0) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }
    const tokenData = verifyToken(token);

    if (!tokenData) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }
    // @ts-ignore
    req["user"] = (tokenData as JwtPayload).userId;
    next();
  } catch (error) {
    next(error);
  }
}

export default isAuthenticated;
