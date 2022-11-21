import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import jwt_decode from "jwt-decode";
import { IToken } from "../utils/IToken";
import { resultCode } from "../utils/resultCode.enum";
import { NextFunction, Request, Response } from "express"
dotenv.config();

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token')
  if (!token) return res.status(401).json({ header: { resultCode: resultCode.UNAUTHORIZED, message: 'Access denied' } });
  try {
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    const object: IToken = jwt_decode(token);

    if (object.role === "admin") {
      next();
    } else {
      res.status(401).json({ header: { resultCode: resultCode.UNAUTHORIZED, message: 'Access denied' } });
    }
  } catch (err) {
    res.status(401).json({ header: { resultCode: resultCode.UNAUTHORIZED, message: 'Invalid token' } });
  }
}