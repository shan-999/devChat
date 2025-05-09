import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from '../types/types'
import dotenv from 'dotenv'
dotenv.config();


const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOCKEN as string;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOCKEN as string;



export const genarateAccessTocken = async ({ userId, role, user }: { userId: string, role: string, user: User }) => {
    return jwt.sign({ userId, role, user }, JWT_ACCESS_TOKEN, { expiresIn: '15m' })
}

export const gernarateRefreshTocken = async ({ userId, role, user }: { userId: string, role: string, user: User }) => {
    return jwt.sign({ userId, role, user }, JWT_REFRESH_TOKEN, { expiresIn: '2h' })
}


export const verifyRefreshTocken = async (tocken: string) => {
    try {
        const decode = jwt.verify(tocken, JWT_REFRESH_TOKEN) as JwtPayload
        return decode.user
    } catch (error) {
        console.log('error from verify tocken ',error);
    }
}