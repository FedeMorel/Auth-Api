import Joi from "joi";
import { Post } from "../../schemas/post";
import { Request, Response } from "express";
import { resultCode } from "../../utils/resultCode.enum";

const schemaPost = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().max(1000).required(),
  author: Joi.object().keys({
    name: Joi.string().max(15).required(),
    userId: Joi.string().hex().min(24).max(24).required(),
    role: Joi.string().required(),
  }).required()
})

export const createPost = async (req: Request, res: Response) => {

  const { title, description, author } = req.body;
  const { error } = schemaPost.validate(req.body);

  if (!!error) {
    return res.status(400).json(
      { header: { resultCode: resultCode.VALIDATION_ERROR, error: error.details[0].message } }
    )
  }

  const post = new Post({
    title,
    description,
    author
  });

  try {
    const newPost = await post.save();
    res.status(201).json({
      header: {
        message: 'Post created successfully',
        resultCode: resultCode.OK,
      },
      data: {
        newPost
      }
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ header: { resultCode: resultCode.FAIL, error } });
  }
}