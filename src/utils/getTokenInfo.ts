import { IToken } from "./IToken";
import jwt_decode from "jwt-decode";
import { Request, Response } from "express";

export const getTokenInfo = async (req: Request, res: Response): Promise<IToken> => {
  const token = req.header('auth-token') || "";
  const tokenData: IToken = jwt_decode(token);
  return tokenData;
}