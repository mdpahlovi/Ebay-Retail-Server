import { Document, Model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    image: string;
    role: string;
    isVerify: boolean;
}

export type UserModel = Model<IUser, Record<string, unknown>>;
