import { Request, Response } from "express"
import userModel from "../model/userModel"
import dotenv from 'dotenv';
import { Decode } from "../types/types";
import { gernarateRefreshTocken, genarateAccessTocken } from "../service/tocken-service";
import bcrypt from 'bcrypt';
dotenv.config();




const signUp = async (req: Request, res: Response) => {
    try {
        const { email, userName, password, confirmPassword } = req.body

        if (!email || !password || !userName || !confirmPassword) {
            res.status(400).json({ success: false, message: 'please fill all required fields' })
            return
        }

        if (password !== confirmPassword) {
            res.status(400).json({ success: false, message: 'password not match' })
            return
        }

        const userExist = await userModel.findOne({ email })

        if (userExist) {
            res.status(400).json({ success: false, message: 'Email alredy exist' })
            return
        }

        const user = new userModel({
            userName,
            email,
            password,
            onBording: false
        })

        await user.save()


        const accessTocken = genarateAccessTocken({ userId: user._id, role: 'user', user } as Decode)
        const refreshTocken = gernarateRefreshTocken({ userId: user._id, role: 'user', user } as Decode)

        res.cookie('access_tocken', accessTocken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        })

        res.cookie('refresh_tocken', refreshTocken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })


        res.status(200).json({ success: true, user })
    } catch (error) {
        console.log('error from sigup', error);
    }
}



const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email }).populate('friends')

        if (!user) {
            res.status(400).json({ success: false, message: 'user not exist' })
            return
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)


        if (!isPasswordMatch) {
            res.status(400).json({ success: false, message: 'invalied credintials' })
            return
        }

        const accessTocken = await genarateAccessTocken({ userId: user._id, role: 'user', user } as Decode)
        const refereshTocken = await gernarateRefreshTocken({ userId: user._id, role: 'user', user } as Decode)

        // console.log('access   :  ',accessTocken,'refresh  :  ',refereshTocken);


        res.cookie('access_tocken', accessTocken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        })


        res.cookie('refresh_tocken', refereshTocken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        })


        res.status(200).json({ success: true, user })

    } catch (error) {
        console.log('error form login', error);

    }
}


const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('access_tocken', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });

        res.clearCookie('refresh_tocken', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });
        

        res.status(200).json({success:true,message:'logout successfully'})
    } catch (error) {
        console.log('error from logout : ', error);

    }
}



const smap = async (req: Request, res: Response) => {
    try {
        const { data } = req.body

        if (!data) {
            res.status(400).json({ success: false, message: 'error' })
            return
        }

        console.log(data);
        res.status(200).json({ success: true, message: 'success' })

    } catch (error) {
        console.log('error from smap', error);

    }
}

export = {
    signUp,
    login,
    logout,
    smap
}