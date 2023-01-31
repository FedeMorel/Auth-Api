import Joi from "joi";
import { Post } from "../../schemas/post.schema";
import { Request, Response } from "express";
import { resultCode } from "../../utils/resultCode.enum";

const schemaPost = Joi.object({
  title: Joi.string().max(200).required(),
  description: Joi.string().max(2000).required(),
  id: Joi.string().hex().min(24).max(24)
})

export const updatePost = async (req: Request, res: Response) => {
  const { title, description, id } = req.body;
  const { error } = schemaPost.validate(req.body);
  const modificationDate: Date = new Date();
  if (!!error) {
    return res.status(400).json(
      { header: { resultCode: resultCode.VALIDATION_ERROR, error: error.details[0].message } }
    )
  }

  try {
    const post = await Post.updateOne({ _id: id }, { title, description, modificationDate });

    if (post.matchedCount === 0) { return res.status(200).json({ header: { resultCode: resultCode.POST_NOT_FOUND, error: 'Post not found' } }); }

    res.status(200).json({
      header: {
        message: 'Post successfully updated',
        resultCode: resultCode.OK,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(304).json({ header: { resultCode: resultCode.NOT_MODIFIED, error } });
  }

}