import { Document, Model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    image: string;
    role: "buyer" | "seller" | "admin";
    isVerify: boolean;
}

export type UserModel = Model<IUser, Record<string, unknown>>;
