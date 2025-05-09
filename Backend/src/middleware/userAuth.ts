import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Decode } from '../types/types';


export const verifyTocken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const tocken = req.cookies['access-tocken']

        if (!tocken) {
            res.status(401).json({ success: false, message: 'No Tocken fount' })
            return
        }

        const decode = jwt.verify(tocken, process.env.JWT_ACCESS_TOCKEN as string) as Decode
        req.body.user = decode.user
        next()

    } catch (error) {
        res.status(500).json({ valid: false, message: 'Server error' });
        return
    }
}