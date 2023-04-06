import Joi from "joi";
import { Request, Response } from "express";
import { Comment } from "../../schemas/comment.schema";
import { resultCode } from "../../utils/resultCode.enum";
import { isOwner } from "../../utils/isOwner";

const schemaComment = Joi.object({
  comment: Joi.string().max(500).required(),
  id: Joi.string().hex().min(24).max(24)
})

export const updateComment = async (req: Request, res: Response) => {
  const { comment, id } = req.body;
  const { error } = schemaComment.validate(req.body);

  if (!!error) {
    return res.status(400).json(
      { header: { resultCode: resultCode.VALIDATION_ERROR, error: error.details[0].message } }
    )
  }

  try {
    const commentData = await Comment.findById(id);

    //valida que el comentario exista
    if (!commentData) { return res.status(200).json({ header: { resultCode: resultCode.COMMENT_NOT_FOUND, error: 'Comment not found' } }); }

    //Valida que el userId sea el mismo que el id del autor
    const userId = commentData.author.userId
    if (await isOwner(req, res, userId)) { return res.status(401).json({ header: { resultCode: resultCode.UNAUTHORIZED, message: 'Unauthorized' } }); }

    const differenceMinutes = getDifferenceMinutes(commentData.creationDate);

    if (differenceMinutes > 10) { return res.status(200).json({ header: { resultCode: resultCode.MAXIMUM_TIME, error: 'the maximum time for editing has elapsed' } }); }

    await Comment.updateOne({ _id: id }, { comment });

    res.status(200).json({
      header: {
        message: 'Comment successfully updated',
        resultCode: resultCode.OK,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(304).json({ header: { resultCode: resultCode.NOT_MODIFIED, error } });
  }

}

const validateIsOwner = () => {

}

const getDifferenceMinutes = (createDate: Date) => {
  const currentDate = new Date();
  const minutes = (currentDate.getTime() - createDate.getTime()) / 1000 / 60;
  return Math.abs(Math.round(minutes));
}
