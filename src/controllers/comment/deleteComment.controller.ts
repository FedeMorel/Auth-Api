import { Request, Response } from "express";
import Joi from "joi";
import { Comment } from "../../schemas/comment.schema";
import { resultCode } from "../../utils/resultCode.enum";

const schemaDeleteComment = Joi.object({
  id: Joi.string().hex().min(24).max(24).required(),
})
export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.body;
  const { error } = schemaDeleteComment.validate(req.body);

  if (!!error) {
    return res.status(400).json(
      { header: { resultCode: resultCode.VALIDATION_ERROR, error: error.details[0].message } }
    )
  }

  try {
    await Comment.deleteOne({ _id: id });

    res.status(200).json({
      header: {
        message: 'Comment deleted sastifactually',
        resultCode: resultCode.OK,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ header: { resultCode: resultCode.FAIL, error } });
  }
}