import { Router } from 'express';
import { login } from '../controllers/auth/login.controller';
import { registerUser } from '../controllers/auth/register.controller';
export const routerAuth = Router();

routerAuth.post('/register', registerUser);
routerAuth.post('/login', login);

