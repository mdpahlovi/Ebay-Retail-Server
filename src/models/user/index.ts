import mongoose, { Schema } from "mongoose";
import { IUser, UserModel } from "./interface";

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String },
        image: { type: String, default: "https://shorturl.at/jnruF" },
        role: { type: String, enum: ["buyer", "seller", "admin"], default: "buyer" },
        isVerify: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model<IUser, UserModel>("user", userSchema);
