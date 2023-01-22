import { Request, Response } from "express";
import Joi from "joi";
import { User } from "../../schemas/user";
import { resultCode } from "../../utils/resultCode.enum";

const schemaDisableAccount = Joi.object({
  id: Joi.string().hex().min(24).max(24),
  state: Joi.boolean()
});

export const disableAccount = async (req: Request, res: Response) => {
  const { id, state } = req.body;
  const { error } = schemaDisableAccount.validate(req.body);

  if (!!error) {
    return res.status(400).json(
      { header: { resultCode: resultCode.VALIDATION_ERROR, error: error.details[0].message } }
    )
  }

  try {
    const result = await User.updateOne({ _id: id }, { state });
    if (result.matchedCount === 0) { return res.status(200).json({ header: { resultCode: resultCode.USER_NOT_FOUND, error: 'User not found' } }); }

    res.status(200).json({
      header: {
        message: 'User deactivated correctly',
        resultCode: resultCode.OK,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(304).json({ header: { resultCode: resultCode.NOT_MODIFIED, error } });
  }

}