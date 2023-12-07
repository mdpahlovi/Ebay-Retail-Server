import jwt, { Secret } from "jsonwebtoken";
import config from "../config";

const generateToken = (payload: { id: string; role: string }) => {
    const secret = config.jwt.secret as Secret;
    return jwt.sign(payload, secret, { expiresIn: "1d" });
};

export const jwtHelper = { generateToken };
