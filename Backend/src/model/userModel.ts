import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";

interface Users extends Document {
    userName: string
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    friends: string[]
    onBording:boolean,
    bio:string,
    connectionPreferences:string[],
    experience:string,
    languages:string[],
    profession:string
}

// console.log(bio,connectionPreferences,experience,languages,profession);
const userSchema = new Schema<Users>({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    onBording:{type: Boolean},
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    bio:{type:String},
    connectionPreferences:[{type:String}],
    experience:{type:String},
    languages:[{type:String}],
    profession:{type:String}
}, { timestamps: true })



userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});


userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};


const User = model<Users>('users', userSchema)

export default User