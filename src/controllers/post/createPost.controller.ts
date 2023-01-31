import Joi from "joi";
import { Request, Response } from "express";
import { Post } from "../../schemas/post.schema";
import { resultCode } from "../../utils/resultCode.enum";
import { getTokenInfo } from "../../utils/getTokenInfo";

const schemaPost = Joi.object({
  title: Joi.string().max(200).required(),
  description: Joi.string().max(2000).required()
})

export const createPost = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const { error } = schemaPost.validate(req.body);

  if (!!error) {
    return res.status(400).json(
      { header: { resultCode: resultCode.VALIDATION_ERROR, error: error.details[0].message } }
    )
  }
  const { name, id, role } = await getTokenInfo(req, res);
  const post = new Post({
    title,
    description,
    author: {
      name,
      userId: id,
      role
    }
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