import { Request, Response } from "express";
import Joi from "joi";
import { Post } from "../../schemas/post";
import { resultCode } from "../../utils/resultCode.enum";

const schemaDeletePost = Joi.object({
  id: Joi.string().hex().min(24).max(24).required(),
})
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.body;
  const { error } = schemaDeletePost.validate(req.body);

  if (!!error) {
    return res.status(400).json(
      { header: { resultCode: resultCode.VALIDATION_ERROR, error: error.details[0].message } }
    )
  }

  try {
    const post = await Post.deleteOne({ _id: id });

    res.status(200).json({
      header: {
        message: 'Post deleted sastifactually',
        resultCode: resultCode.OK,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ header: { resultCode: resultCode.FAIL, error } });
  }

}