import { Router } from 'express';
import authController from '../controller/auth.controller'
import User from '../Models/user.model';

const authRouter = Router();
const authRoute = (entity) => {
    const user = new User(entity)
    const { login, register } = authController(user)
    authRouter.post('/login', login)
    authRouter.post('/register', register)
    return authRouter;
}

export default authRoute;