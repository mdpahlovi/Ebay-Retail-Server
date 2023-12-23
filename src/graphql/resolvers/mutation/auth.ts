import User from "../../../models/user/index.js";
import { compare, hash } from "bcrypt";
import { GraphQLError } from "graphql";
import { jwtHelper } from "../../../utils/jwtHelper.js";
import { IUser } from "../../../models/user/interface.js";

interface Login {
    email: string;
    password: string;
}
interface Register {
    name: string;
    email: string;
    password: string;
}
interface SocialLogin {
    name: String;
    email: String;
    image: String;
    provider: String;
}

export const Auth = {
    login: async (parent: any, { email, password }: Login) => {
        // Check Credential
        const user = await User.findOne({ email });
        if (!user?._id) throw new GraphQLError("User doesn't exist...!", { extensions: { code: "BAD_REQUEST" } });
        if (!user?.password || !(await compare(password, user.password)))
            throw new GraphQLError("Password doesn't match...!", { extensions: { code: "BAD_REQUEST" } });

        // Generate Token
        const token = jwtHelper.encodeToken(user);
        return { token };
    },
    register: async (parent: any, { name, email, password }: Register) => {
        // Check User Existence
        const user = await User.findOne({ email });
        if (user?._id) throw new GraphQLError("User already exist...!", { extensions: { code: "BAD_REQUEST" } });

        // Create User
        const newUser = new User({ name, email, password: await hash(password, 12) });
        const newUserData = await newUser.save();

        // Generate Token
        const token = jwtHelper.encodeToken(newUserData);
        return { token };
    },
    socialLogin: async (parent: any, { name, email, image, provider }: SocialLogin) => {
        let user: IUser;
        const isExist = await User.findOne({ email });

        if (isExist) {
            user = isExist;
        } else {
            const newUser = new User({ name, email, image, provider, isVerify: true });
            user = await newUser.save();
        }

        const token = jwtHelper.encodeToken(user);
        return { token };
    },
};
