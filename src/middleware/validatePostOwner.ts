import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import jwt_decode from "jwt-decode";
import { IToken } from "../utils/IToken";
import { resultCode } from "../utils/resultCode.enum";
import { NextFunction, Request, Response } from "express"
import { Post } from "../schemas/post";
import { ResultsValidateOwner } from "../utils/resultsValidateOwner.enuim";
dotenv.config();

export const verifyPostOwner = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token')
  if (!token) return res.status(401).json({ header: { resultCode: resultCode.UNAUTHORIZED, message: 'Access denied' } });
  try {
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    const object: IToken = jwt_decode(token);
    const validationResult = await isOwnerPost(req, res, object.id);
    if (validationResult === ResultsValidateOwner.APPROVE) {
      next();
    }
    else if (validationResult === ResultsValidateOwner.NOT_FOUND) {
      res.status(200).json({ header: { resultCode: resultCode.USER_NOT_FOUND, error: 'Post not found' } });
    }
    else {
      res.status(401).json({ header: { resultCode: resultCode.UNAUTHORIZED, message: 'Access denied' } });
    }
  } catch (err) {
    res.status(401).json({ header: { resultCode: resultCode.UNAUTHORIZED, message: 'Invalid token' } });
  }
}

const isOwnerPost = async (req: Request, res: Response, userId: string): Promise<string> => {
  const { id } = req.body;
  const post = await Post.findOne({ _id: id });
  let result = "";

  if (!post) {
    result = ResultsValidateOwner.NOT_FOUND;
  } else if (post.author.userId === userId) {
    result = ResultsValidateOwner.APPROVE;
  } else {
    result = ResultsValidateOwner.DENIED;
  }

  return result;
}