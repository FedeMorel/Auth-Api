import { Request, Response } from "express";
import Joi from "joi";
import { resultCode } from "../../utils/resultCode.enum";
import { Comment } from "../../schemas/comment.schema";
import { getTokenInfo } from "../../utils/getTokenInfo";


const schemaHideComment = Joi.object({
  id: Joi.string().hex().min(24).max(24).required(),
  state: Joi.boolean().required()
})


export const hideComment = async (req: Request, res: Response) => {
  const { id, state } = req.body;
  const { error } = schemaHideComment.validate(req.body);

  if (!!error) {
    return res.status(400).json(
      { header: { resultCode: resultCode.VALIDATION_ERROR, error: error.details[0].message } }
    )
  }

  try {
    const commentData = await Comment.findById(id);

    //valida que el comentario exista
    if (!commentData) { return res.status(200).json({ header: { resultCode: resultCode.COMMENT_NOT_FOUND, error: 'Comment not found' } }); }

    const userId = commentData.author.userId;
    const resultValidate = await validateOwnerOrAdmin(req, res, userId);

    if (!resultValidate) {
      return res.status(401).json({ header: { resultCode: resultCode.UNAUTHORIZED, message: 'Unauthorized' } });
    }

    await Comment.updateOne({ _id: id }, { state });


    res.status(200).json({
      header: {
        message: 'Comment status updated',
        resultCode: resultCode.OK,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(304).json({ header: { resultCode: resultCode.NOT_MODIFIED, error } });
  }

}

const validateOwnerOrAdmin = async (req: Request, res: Response, idAuthor: string): Promise<boolean> => {
  const tokenData = await getTokenInfo(req, res);
  return tokenData.role === "admin" || (idAuthor === tokenData.id);
}