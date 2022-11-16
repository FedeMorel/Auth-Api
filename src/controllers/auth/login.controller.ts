import Joi, { string } from 'joi';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import { User } from '../../schemas/user';
import { Request, Response } from 'express';
import { resultCode } from '../../utils/resultCode.enum';
dotenv.config();

const schemaLogin = Joi.object({
  mail: Joi.string().min(10).max(50).required().email(),
  password: Joi.string().min(8).max(30).required()
})

export const login = async (req: Request, res: Response) => {
  const { mail, password } = req.body;
  const { error } = schemaLogin.validate(req.body);

  if (error) return res.status(400).json({ resultCode: resultCode.VALIDATION_ERROR, error: error.details[0].message })

  const user = await User.findOne({ mail });

  if (!user) { return res.status(200).json({ resultCode: resultCode.USER_NOT_FOUND, error: 'User not found' }); }

  if (!await isValidPassword(password, user.password)) {
    return res.status(400).json({ resultCode: resultCode.INVALID_PASSWORD, error: 'Invalid password' })
  }

  const token = generateToken(user.name, user.id);

  res.header('auth-token', token).json({
    message: 'authenticated user',
    resultCode: resultCode.OK,
    user: {
      id: user.id,
      role: user.role,
      name: user.name,
      mail: user.mail,
      address: user.address,
      birthday: user.birthday,
      phone: user.phone,
    },
    token: token
  });
}

const isValidPassword = async (pass: string, encryptedPass: string): Promise<boolean> => {
  const result = await bcrypt.compare(pass, encryptedPass);
  return !!result
}

const generateToken = (nameUser: string, id: string) => {
  return jwt.sign({
    name: nameUser,
    id: id
  }, process.env.TOKEN_SECRET as string)
}