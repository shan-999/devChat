import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Decode } from '../types/types';

declare module 'express-serve-static-core' {
  interface Request {
    userID?: string; 
  }
}


export const verifyTocken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const tocken = req.cookies.access_tocken
        
        if (!tocken) {
            res.status(401).json({ success: false, message: 'No Tocken fount' })
            return
        }
        
        const decode = jwt.verify(tocken, process.env.JWT_ACCESS_TOCKEN as string) as Decode      
        req.userID = decode.userId
        next()

    } catch (error) {
        console.log('error from verifyTocken : ',error)
        res.status(500).json({ valid: false, message: 'Server error' });
        return
    }
}