import mongoose,{ Schema,Document,Model } from "mongoose";

export interface IUser extends Document{
    clerk_id:string;
    email_address:string;
    usename:string;
    first_name:string;
}

const UserSchema:Schema= new Schema(
    {
        clerk_id:{type:String, required:true, unique:true},
        email_addtess:{type:String, required:true, unique:true},
        username:{type:String, required:true,unique:true},
        first_name:{type :String, required:true}
    },
    {timestamps:true}
)

export const User:Model<IUser> = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("user",UserSchema)

