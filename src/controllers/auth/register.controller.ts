import Joi from 'joi';
import bcrypt from 'bcrypt'
import { User } from '../../schemas/user';
import { Request, Response } from 'express';
import { resultCode } from '../../utils/resultCode.enum';

const schemaRegister = Joi.object({
  name: Joi.string().min(5).max(15).required(),
  mail: Joi.string().min(10).max(50).required().email(),
  password: Joi.string().min(8).max(30).required(),
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

export const registerUser = async (req: Request, res: Response) => {
  const { name, mail, password, address, birthday, phone } = req.body;
  const { error } = schemaRegister.validate(req.body);

  const encryptedPassword = await encryptPassword(password);

  const user = new User({
    name: name,
    mail: mail,
    password: encryptedPassword,
    address: address,
    birthday: birthday,
    phone: phone
  });

  if (!!error) {
    return res.status(400).json(
      { resultCode: resultCode.VALIDATION_ERROR, error: error.details[0].message }
    )
  }

  if (await isMailExist(mail)) {
    return res.status(406).json(
      { resultCode: resultCode.MAIL_REGISTRED, error: 'Mail already registered' }
    )
  }

  try {
    const newUser = await user.save();
    const { id, name, mail, address, birthday, phone, role, date } = newUser
    res.status(201).json({
      message: 'User created successfully',
      resultCode: resultCode.OK,
      user: {
        id,
        role,
        name,
        mail,
        address,
        birthday,
        phone,
        date
      }
    })
  } catch (error) {
    res.status(500).json({ resultCode: resultCode.FAIL, error })
  }
};

export const isMailExist = async (mail: string): Promise<boolean> => {
  let response = await User.findOne({ mail });
  return !!response;
}

const encryptPassword = async (pass: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
}