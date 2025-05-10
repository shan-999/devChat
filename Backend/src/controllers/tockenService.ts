import { Request, Response } from "express";
import { genarateAccessTocken, verifyRefreshTocken } from "../service/tocken-service";
import { User } from "../types/types";
import jwt from 'jsonwebtoken';
import { Decode } from "../types/types";


export const createRefereshTocken = async (req:Request,res:Response) => {
    try {        
        const refreshTocken = req.cookies.refresh_tocken


        if(!refreshTocken){
            res.status(400).json({success:false,message:'tocken is not valied',tockenExpired:true})
            return 
        }

        const user:User = await verifyRefreshTocken(refreshTocken)
        if(!user){
            res.clearCookie('access_tocken')
            res.clearCookie('refresh_tocken')
            res.status(400).json({tockenExpired:true,message:'tocken expired pleas login again'})
        }
        const newAccessTocken = await genarateAccessTocken({userId:user._id,role:'user',user})
        res.cookie('access_tocken',newAccessTocken, {
            httpOnly: true,
            secure: false, 
            sameSite: 'strict'
        })
        
        res.status(200).json({success:true,newAccessTocken})
        
    } catch (error) {
        console.log('error from refresh Tocken',error);
        res.status(500).json({ tockenExpired: true, message: "Session expired please login again" });
    }
}



export const checkTocken = async (req:Request,res:Response) => {
    try {
        
        
        const tocken = req.cookies.access_tocken
        
        if (!tocken) {
            res.status(401).json({ success: false, message: 'No Tocken fount' })
            return
        }
        
        const decode = jwt.verify(tocken, process.env.JWT_ACCESS_TOCKEN as string) as Decode
        if(decode){
            res.status(200).json({success:true,message:'tocecken is valide',user:decode.user})
        }else{
            res.status(401).json({success:false,message:'got some error'})
        }

    } catch (error) {
        console.log('error from checkTocken : ',error);
        res.status(401).json({ success: false, message: 'Token verification failed' });
    }
}


