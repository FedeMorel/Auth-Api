import Joi, { string } from 'joi';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import { User } from '../../schemas/user';
import { Request, Response } from 'express';
dotenv.config();

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required()
})

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { error } = schemaLogin.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message })

  const user = await User.findOne({ email });

  if (!user) { return res.status(204).json({ error: 'User not found' }); }

  if (!await isValidPassword(password, user.password)) {
    return res.status(400).json({ error: 'Invalid password' })
  }

  const token = generateToken(user.name, user.id);

  res.header('auth-token', token).json({
    message: 'authenticated user',
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