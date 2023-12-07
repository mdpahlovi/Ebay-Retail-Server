import mongoose, { Schema } from "mongoose";
import { IUser, UserModel } from "./interface";

const userSchema = new Schema<IUser>(
    {
        name: String,
        email: String,
        image: String,
        role: String,
        isVerify: Boolean,
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model<IUser, UserModel>("user", userSchema);
