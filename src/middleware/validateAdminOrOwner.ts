import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import { IToken } from "../utils/IToken";
import { resultCode } from "../utils/resultCode.enum";
import { NextFunction, Request, Response } from "express"
import { ResultsValidateOwner } from "../utils/resultsValidateOwner.enuim";
import { isOwner } from "../utils/isOwner";
import { Comment } from "../schemas/comment.schema";
import { getTokenInfo } from "../utils/getTokenInfo";
import { IComment } from "../utils/IComment";
import { Post } from "../schemas/post.schema";
dotenv.config();

export const verifyAdminOrOwner = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ header: { resultCode: resultCode.UNAUTHORIZED, message: 'Access denied' } });
  try {
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    const tokenData: IToken = await getTokenInfo(req, res);
    const validationResult = await getOwerPost(req, res, tokenData);
    if (validationResult === ResultsValidateOwner.APPROVE) {
      next();
    }
    else if (validationResult === ResultsValidateOwner.COMMENT_NOT_FOUND) {
      res.status(200).json({ header: { resultCode: resultCode.COMMENT_NOT_FOUND, error: 'Comment not found' } });
    }
    else if (validationResult === ResultsValidateOwner.POST_NOT_FOUND) {
      res.status(200).json({ header: { resultCode: resultCode.COMMENT_NOT_FOUND, error: 'The post is not available' } });
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

const getOwerPost = async (req: Request, res: Response, tokenData: IToken): Promise<string> => {
  const { id } = req.body;
  let result;
  try {
    const comment: IComment | null = await Comment.findById(id);
    if (!comment) { return ResultsValidateOwner.COMMENT_NOT_FOUND; }
    const post = await Post.findById(comment.idPost);
    if (!post) { return ResultsValidateOwner.POST_NOT_FOUND; }
    if (tokenData.role === "admin" || tokenData.id === post.author.userId) { result = ResultsValidateOwner.APPROVE; }
    else { result = ResultsValidateOwner.DENIED; }
    return result;
  } catch (error) {
    console.error(error);
    return ResultsValidateOwner.FAIL;
  }
}