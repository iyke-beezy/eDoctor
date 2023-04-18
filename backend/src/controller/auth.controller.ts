import User from '../Models/user.model';
import { Request, Response } from 'express';

const authController = (userModel: User) => {

    const login = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        try {
            const user = await userModel.login(username, password);
            res.status(201).json({
                status: 'Successful',
                data: user
            })
        } catch (error) {
            res.status(error.statusCode).json({
                status: error.name,
                message: error.message
            })
        }
    }

    const register = async (req: Request, res: Response) => {
        const { username, firstName, lastName, email, mobile, dob, password, address } = req.body;
        try {
            const user = await userModel.register(username, firstName, lastName, email, mobile, dob, password, address);
            res.status(201).json({
                status: 'Successful',
                data: user
            })
        } catch (error) {
            res.status(error.statusCode).json({
                status: error.name,
                message: error.message
            })
        }
    }

    return {
        login,
        register
    }

}

export default authController