import { Router } from 'express';
import { verifyAdmin } from '../middleware/validateAdmin';
import { login } from '../controllers/auth/login.controller';
import { getUsers } from '../controllers/users/getUsers.controller';
import { registerUser } from '../controllers/auth/register.controller';
import { disableAccount } from '../controllers/users/disableAccount.controller';
export const routerUser = Router();

routerUser.post('/register', registerUser);
routerUser.post('/login', login);
routerUser.get('/users', verifyAdmin, getUsers);
routerUser.post('/disable-account', verifyAdmin, disableAccount);