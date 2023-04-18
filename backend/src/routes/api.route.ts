import { Router } from 'express';
import apiController from '../controller/api.controller'
import User from '../Models/user.model';
import { auth } from '../middlewares/auth';

const apiRouter = Router();
const apiRoute = (entity) => {
    // console.log(entity.migrations)
    const user = new User(entity)
    const { getUser, getAllUsers } = apiController(user)
    apiRouter.get('/getUser/:id', auth, getUser)
    apiRouter.get('/getAllUsers', auth, getAllUsers)
    return apiRouter;
}

export default apiRoute;