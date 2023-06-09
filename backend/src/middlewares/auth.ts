import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from './../Error/errors'
import 'dotenv/config';

export const SECRET_KEY: Secret = process.env.JWT_PRIVATE_SECRET.replace(/\\n/g, "\n");

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new AuthenticationError();
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).token = decoded;

        next();
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            res.status(401).send('Wrong token!')
        } else {
            res.status(err.statusCode).send(err.message);
        }
    }
};