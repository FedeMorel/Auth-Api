import Joi from 'joi';
import bcrypt from 'bcrypt'
import { User } from '../../schemas/user';
import { Request, Response } from 'express';

const schemaRegister = Joi.object({
  name: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  address: Joi.object().keys({
    street: Joi.string().max(50).required(),
    location: Joi.string().max(50).required(),
    city: Joi.string().max(50).required(),
    country: Joi.string().max(50).required(),
    cp: Joi.string().min(4).max(4).required()
  })
})

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, address } = req.body;
  const { error } = schemaRegister.validate(req.body);

  const encryptedPassword = await encryptPassword(password);

  const user = new User({
    name: name,
    email: email,
    password: encryptedPassword,
    address: address
  });

  if (!!error) {
    return res.status(400).json(
      { error: error.details[0].message }
    )
  }

  if (await isEmailExist(email)) {
    return res.status(406).json(
      { error: 'Email already registered' }
    )
  }

  try {
    const newUser = await user.save();
    const { name, email, address, id } = newUser
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id,
        name,
        email,
        address
      }
    })
  } catch (error) {
    res.status(500).json({ error })
  }
};

export const isEmailExist = async (email: string): Promise<boolean> => {
  let response = await User.findOne({ email });
  return !!response;
}

const encryptPassword = async (pass: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
}