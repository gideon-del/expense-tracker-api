import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import { config } from "dotenv";
config();
type UserToken = {
  accessToken: string;
  refreshToken: string;
};
const SALT = 10;
const accessTokenSecret = process.env.JWT_ACCESS_SECRET!;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET!;

function generateToken(userId: string): UserToken {
  console.log(userId);
  const accessToken = jwt.sign(
    {
      userId,
    },
    accessTokenSecret,
    {
      expiresIn: "1h",
    }
  );
  const refreshToken = jwt.sign(
    {
      userId,
    },
    refreshTokenSecret,
    {
      expiresIn: "1 day",
    }
  );
  return {
    accessToken,
    refreshToken,
  };
}

function verifyToken(accessToken: string) {
  try {
    const userData = jwt.verify(accessToken, process.env.JWT_SECRET!);
    return userData;
  } catch (error) {
    console.error("Invalid token");
    return;
  }
}

function regenerateAccessToken(refreshToken: string) {
  const token = jwt.verify(refreshToken, refreshTokenSecret);
  if (typeof token === "string") return;

  const accessToken = jwt.sign(
    {
      userId: token.userId,
    },
    accessTokenSecret,
    {
      expiresIn: "1h",
    }
  );
  return accessToken;
}
function hashPassword(password: string): string {
  const hashPassword = bcrypt.hashSync(password, SALT);
  return hashPassword;
}
function comparePassword(passoword: string, hashedPassword: string) {
  return bcrypt.compareSync(passoword, hashedPassword);
}
function convertZodEror(error: ZodError<any>) {
  const errors: any = {};
  error.issues.forEach((error) => {
    const errorDetail = error.message;
    error.path.forEach((path) => {
      if (errors.hasOwnProperty(path)) {
        errors[path] = [...errors[path], errorDetail];
      } else {
        errors[path] = [errorDetail];
      }
    });
  });
  return errors;
}
export {
  generateToken,
  verifyToken,
  regenerateAccessToken,
  hashPassword,
  comparePassword,
  convertZodEror,
};
