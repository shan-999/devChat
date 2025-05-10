import userModel from "../model/userModel";
import { Request,Response } from "express";
import { User } from "../types/types";

const compleateUserProfile = async (req:Request,res:Response) => {
    try {
        const {bio,connectionPreferences,experience,languages,profession} = req.body
        const userId = req.params.id

        console.log(bio,connectionPreferences,experience,languages,profession);
        console.log(userId);

        const user = await userModel.findById(userId)
        if(!user){
            res.status(400).json({sucess:false,message:'user not fount'})
            return
        }


        user.bio = bio
        user.connectionPreferences = connectionPreferences
        user.experience = experience,
        user.languages = languages,
        user.profession = profession
        user.onBording = true

        await user.save()
        res.status(200).json({success:true,message:'user profile compleate success',user})

    } catch (error) {
        
    }
}



const getAvileUser = async (req:Request,res:Response) => {
    try {        
        const userid = req.params.id

        const user = await userModel.findById(userid)

        if(!user){
            res.status(400).json({success:false,message:'user not fount'})
            return
        }
        const experiences = ['0-1','1-3','3-5','5-10','10+']
        const experienceIndex = experiences.indexOf(user.experience)
        const allowedExprience = experiences.slice(experienceIndex)
        console.log(user.connectionPreferences);
        

        const avaiUsers = await userModel.find({
            _id:{
                $ne:user._id,
                $nin: user.friends
            },
            languages:{$in: user.languages},
            connectionPreferences:{$in: user.connectionPreferences},
            experience:{$in: allowedExprience}
        }).limit(20)

        console.log(avaiUsers,avaiUsers.length);
        

        res.status(200).json({success:true,avaiUsers})
    } catch (error) {
        
    }
}


const addAFriend = async (req:Request,res:Response) => {
    try {
        const userId = req.params.id
        const {action,friendId} = req.body
        
        const user = await userModel.findById(userId)
        if(!user){
            res.status(400).json({success:false,message:'user not fount'})
            return
        }

        if(action === 'add'){
            if(!user.friends.includes(friendId)){
                user.friends.push(friendId)
            }
        }else if(action === 'remove'){
            for(let i = 0; i < user.friends.length; i ++ ){

                if(friendId === user.friends[i]){
                    user.friends.splice(i, 1);
                }

            }
        }

        user.save()

        const populatedData = await userModel.findById(userId).populate('friends')

        res.status(200).json({success:true,populatedData})
    } catch (error) {
        
    }
} 






export = {
    compleateUserProfile,
    getAvileUser,
    addAFriend
}