import { Request, Response } from "express";
import { Comment } from "../schemas/comment.schema";
import { Post } from "../schemas/post.schema";
import { resultCode } from "./resultCode.enum";
import { ResultsValidateOwner } from "./resultsValidateOwner.enuim";

export const isOwner = async (req: Request, res: Response, userId: string, collection: string): Promise<string> => {
  const { id } = req.body;
  let data;
  try {
    if (collection === "post") {
      data = await Post.findOne({ _id: id });
    }
    else if (collection === "comment") {
      data = await Comment.findOne({ _id: id });
    }

    let result = "";

    if (!data) {
      result = ResultsValidateOwner.NOT_FOUND;
    } else if (data.author.userId === userId) {
      result = ResultsValidateOwner.APPROVE;
    } else {
      result = ResultsValidateOwner.DENIED;
    }
    return result;
  } catch (error) {
    console.error(error);
    return ResultsValidateOwner.FAIL;
  }


}