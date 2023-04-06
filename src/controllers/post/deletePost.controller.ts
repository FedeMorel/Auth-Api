import Joi from "joi";
import { Request, Response } from "express";
import { isOwner } from "../../utils/isOwner";
import { Post } from "../../schemas/post.schema";
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
    const postData = await Post.findById(id);

    //valida que el post exista
    if (!postData) { return res.status(200).json({ header: { resultCode: resultCode.POST_NOT_FOUND, error: 'Post not found' } }); }

    //Valida que el userId sea el mismo que el id del autor
    const userId = postData.author.userId
    if (await isOwner(req, res, userId)) { return res.status(401).json({ header: { resultCode: resultCode.UNAUTHORIZED, message: 'Unauthorized' } }) }

    await Post.deleteOne({ _id: id });

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