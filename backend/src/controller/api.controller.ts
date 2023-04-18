import User from '../Models/user.model';
import { Request, Response } from 'express'

const apiController = (model: User) => {

    const getUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await model.getUser(id);

            res.status(201).json({
                status: 'Successful',
                data: user
            })
        } catch (err) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            })
        }
    }

    const getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await model.getAllUsers()
            res.status(200).json({
                status: 'Successful',
                data: users
            })
        } catch (error) {
            res.status(501).json({
                status: "Error Occured",
                message: error.message
            })
        }
    }

    return {
        getUser,
        getAllUsers
    }
}

export default apiController;