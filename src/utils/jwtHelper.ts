import jwt, { Secret } from "jsonwebtoken";
import config from "../config";
import { JwtPayload } from "../types";
import { IUser } from "../models/user/interface";

const encodeToken = (payload: IUser) => {
    const secret = config.jwt.secret as Secret;
    const { _id, name, email, phone, image, role, isVerify } = payload;
    return jwt.sign({ id: _id, name, email, phone, image, role, isVerify }, secret, { expiresIn: "1d" });
};

const decodeToken = async (token: string): Promise<JwtPayload | null> => {
    const secret = config.jwt.secret as Secret;
    try {
        return jwt.verify(token, secret) as JwtPayload;
    } catch (error) {
        return null;
    }
};

export const jwtHelper = { encodeToken, decodeToken };
