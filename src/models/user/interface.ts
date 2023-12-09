import { Document, Model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    image: string;
    role: "buyer" | "seller" | "admin";
    provider: "custom" | "google" | "github";
    password: string;
    isVerify: boolean;
}

export type UserModel = Model<IUser, Record<string, unknown>>;
