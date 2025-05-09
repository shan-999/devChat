import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MNGOOSE_URI!)
        console.log('db connected successfully');
    } catch (error) {
        console.log('error from connect db : ',error);        
    }
}