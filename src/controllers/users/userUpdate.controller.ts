import Joi from "joi";
import { Request, Response } from "express";
import { User } from "../../schemas/user.schema";
import { resultCode } from "../../utils/resultCode.enum";

const schemaUpdateUser = Joi.object({
  id: Joi.string().hex().min(24).max(24),
  name: Joi.string().min(5).max(50).required(),
  address: Joi.object().keys({
    street: Joi.string().max(50),
    location: Joi.string().max(50),
    city: Joi.string().max(50),
    country: Joi.string().max(50),
    cp: Joi.string().alphanum().min(4).max(4),
  }),
  birthday: Joi.date(),
  phone: Joi.string().max(15),
})

export const updateUser = async (req: Request, res: Response) => {

  const { name, mail, address, birthday, phone, id } = req.body;
  const { error } = schemaUpdateUser.validate(req.body);

  if (!!error) {
    return res.status(400).json(
      { header: { resultCode: resultCode.VALIDATION_ERROR, error: error.details[0].message } }
    )
  }

  try {
    await User.updateOne({ _id: id }, { name, mail, address, birthday, phone });

    const userData = await User.findById(id);

    //si no existe el userData mostramos un error
    if (!userData) { throw new Error("Internal server error") }

    res.status(200).json({
      header: {
        message: 'User successfully updated',
        resultCode: resultCode.OK,
      },
      user: {
        id: userData.id,
        role: userData.role,
        name: userData.name,
        mail: userData.mail,
        address: userData.address,
        birthday: userData.birthday,
        phone: userData.phone,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(304).json({ header: { resultCode: resultCode.NOT_MODIFIED, error } });
  }

}