import Joi from "joi";
import { Request, Response } from "express";
import { Comment } from "../../schemas/comment.schema";
import { resultCode } from "../../utils/resultCode.enum";
import { isOwner } from "../../utils/isOwner";

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
    const commentData = await Comment.findById(id);

    //valida que exista el comentario
    if (!commentData) { return res.status(200).json({ header: { resultCode: resultCode.COMMENT_NOT_FOUND, error: 'comment not found' } }); }

    //Valida que el userId sea el mismo que el id del autor
    const userId = commentData.author.userId
    if (await isOwner(req, res, userId)) { return res.status(401).json({ header: { resultCode: resultCode.UNAUTHORIZED, message: 'Unauthorized' } }); }

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