import jwt, { Secret } from "jsonwebtoken";
import config from "../config";
import { JwtPayload } from "../types";

const encodeToken = (payload: { id: string; role: string }) => {
    const secret = config.jwt.secret as Secret;
    return jwt.sign(payload, secret, { expiresIn: "1d" });
};

const decodeToken = async (token: string): Promise<JwtPayload | null> => {
    const secret = config.jwt.secret as Secret;
    try {
        const data = jwt.verify(token, secret) as JwtPayload;
        return data;
    } catch (error) {
        return null;
    }
};

export const jwtHelper = { encodeToken, decodeToken };
