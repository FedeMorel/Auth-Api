import { NextFunction, Request, Response } from "express";
import { resultCode } from "../utils/resultCode.enum";

const jwt = require('jsonwebtoken');

export function validateUser(req: Request, res: Response, next: NextFunction) {
  const token = req.header('auth-token');
  const { id } = req.body;

  if (!token) return res.status(401).json({ header: { resultCode: resultCode.UNAUTHORIZED, message: 'Invalid token' } });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

    if (decoded.id !== id) {
      return res.status(403).json({ header: { resultCode: resultCode.FORBIDDEN, message: 'Unauthorized' } });
    }

    next();
  } catch (error) {
    return res.status(401).json({ header: { resultCode: resultCode.UNAUTHORIZED, message: 'Invalid token' } });
  }
}