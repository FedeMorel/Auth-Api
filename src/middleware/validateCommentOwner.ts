import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import jwt_decode from "jwt-decode";
import { IToken } from "../utils/IToken";
import { resultCode } from "../utils/resultCode.enum";
import { NextFunction, Request, Response } from "express"
import { ResultsValidateOwner } from "../utils/resultsValidateOwner.enuim";
import { isOwner } from "../utils/isOwner";
dotenv.config();

export const verifyCommentOwner = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ header: { resultCode: resultCode.UNAUTHORIZED, message: 'Access denied' } });
  try {
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    const object: IToken = jwt_decode(token);
    const validationResult = await isOwner(req, res, object.id, "comment");
    if (validationResult === ResultsValidateOwner.APPROVE) {
      next();
    }
    else if (validationResult === ResultsValidateOwner.NOT_FOUND) {
      res.status(200).json({ header: { resultCode: resultCode.COMMENT_NOT_FOUND, error: 'comment not found' } });
    }
    else if (validationResult === ResultsValidateOwner.DENIED) {
      res.status(401).json({ header: { resultCode: resultCode.UNAUTHORIZED, message: 'Access denied' } });
    }
    else {
      res.status(500).json({ header: { resultCode: resultCode.FAIL, error: "Internal server error" } });
    }
  } catch (err) {
    res.status(401).json({ header: { resultCode: resultCode.UNAUTHORIZED, message: 'Invalid token' } });
  }
}
