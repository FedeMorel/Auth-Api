import Joi from "joi";
import { Request, Response } from "express";
import { resultCode } from "../../utils/resultCode.enum";
import { getTokenInfo } from "../../utils/getTokenInfo";
import { Comment } from "../../schemas/comment.schema";

const schemaComment = Joi.object({
  idPost: Joi.string().min(24).max(24).required(),
  comment: Joi.string().max(500).required()
})

export const createComment = async (req: Request, res: Response) => {
  const { idPost, comment } = req.body;
  const { error } = schemaComment.validate(req.body);

  if (!!error) {
    return res.status(400).json(
      { header: { resultCode: resultCode.VALIDATION_ERROR, error: error.details[0].message } }
    )
  }
  const { name, id, role } = await getTokenInfo(req, res);
  const commentData = new Comment({
    idPost,
    comment,
    author: {
      name,
      userId: id,
      role
    }
  });

  try {
    const newCommnet = await commentData.save();
    res.status(201).json({
      header: {
        message: 'Comment created successfully',
        resultCode: resultCode.OK,
      },
      data: {
        newCommnet
      }
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ header: { resultCode: resultCode.FAIL, error } });
  }
}