import User from "../../../models/user/index.js";
import { compare, hash } from "bcrypt";
import { GraphQLError } from "graphql";
import { jwtHelper } from "../../../utils/jwtHelper.js";
import { IUser } from "../../../models/user/interface.js";
import { CookieOptions, Response } from "express";
import { JwtPayload, Token } from "../../../types/index.js";
import { uploadImage } from "../../../utils/uploadImage.js";

type Login = { email: string; password: string };
type Register = { name: string; email: string; password: string };
type SocialLogin = { name: string; email: string; image: string; provider: string };
type Profile = { name: string; phone: string; image: string };

const options: CookieOptions = {
    domain: "ebay-retail.vercel.app",
    sameSite: "lax",
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
};

export const Auth = {
    login: async (parent: any, { email, password }: Login, { res }: { res: Response }) => {
        const user = await User.findOne({ email });
        if (!user?._id) throw new GraphQLError("User doesn't exist...!", { extensions: { code: "BAD_REQUEST" } });
        if (!user?.password || !(await compare(password, user.password)))
            throw new GraphQLError("Password doesn't match...!", { extensions: { code: "BAD_REQUEST" } });

        const token = jwtHelper.encodeToken(user);
        res.cookie("ebay-retail-auth", token, {});
        return user;
    },
    register: async (parent: any, { name, email, password }: Register, { res }: { res: Response }) => {
        const user = await User.findOne({ email });
        if (user?._id) throw new GraphQLError("User already exist...!", { extensions: { code: "BAD_REQUEST" } });

        const newUser = new User({ name, email, password: await hash(password, 12) });
        const newUserData = await newUser.save();

        const token = jwtHelper.encodeToken(newUserData);
        res.cookie("ebay-retail-auth", token, options);
        return newUserData;
    },
    socialLogin: async (parent: any, { name, email, image, provider }: SocialLogin, { res }: { res: Response }) => {
        let user: IUser;
        const isExist = await User.findOne({ email });

        if (isExist) {
            user = isExist;
        } else {
            const newUser = new User({ name, email, image, provider, isVerify: true });
            user = await newUser.save();
        }

        const token = jwtHelper.encodeToken(user);
        res.cookie("ebay-retail-auth", token, options);
        return user;
    },
    profile: async (parent: any, args: Profile, { token, res }: { token: JwtPayload; res: Response }) => {
        if (args.image !== token.image) args.image = await uploadImage(args.image, "User");
        const user = await User.findByIdAndUpdate(token.id, args, { new: true });

        const newToken = jwtHelper.encodeToken(user);
        // @ts-ignore
        res.cookie("ebay-retail-auth", newToken, { ...options, overwrite: true });
        return user;
    },
};
