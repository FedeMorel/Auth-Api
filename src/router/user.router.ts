import { Router } from 'express';
import { verifyAdmin } from '../middleware/validateAdmin';
import { validateUser } from '../middleware/validateUser';
import { login } from '../controllers/auth/login.controller';
import { getUsers } from '../controllers/users/getUsers.controller';
import { registerUser } from '../controllers/auth/register.controller';
import { updateUser } from '../controllers/users/userUpdate.controller';
import { disableAccount } from '../controllers/users/disableAccount.controller';
export const routerUser = Router();

routerUser.post('/register', registerUser);
routerUser.post('/login', login);
routerUser.post('/disable-account', verifyAdmin, disableAccount);
routerUser.get('/users', verifyAdmin, getUsers);
routerUser.put('/update', validateUser, updateUser);