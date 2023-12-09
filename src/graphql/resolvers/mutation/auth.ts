import User from "../../../models/user";
import { compare, hash } from "bcrypt";
import { GraphQLError } from "graphql";
import { jwtHelper } from "../../../utils/jwtHelper";

interface Login {
    email: string;
    password: string;
}
interface Register {
    name: string;
    email: string;
    password: string;
}

export const Auth = {
    login: async (parent: any, { email, password }: Login) => {
        const user = await User.findOne({ email });

        if (!user?._id) throw new GraphQLError("User doesn't exist...!", { extensions: { code: "BAD_REQUEST" } });
        if (!user?.password || !(await compare(password, user.password)))
            throw new GraphQLError("Password doesn't match...!", { extensions: { code: "BAD_REQUEST" } });

        const token = jwtHelper.encodeToken(user);
        return { token };
    },
    register: async (parent: any, { name, email, password }: Register) => {
        const user = await User.findOne({ email });

        if (user?._id) throw new GraphQLError("User already exist...!", { extensions: { code: "BAD_REQUEST" } });

        const hashPassword = await hash(password, 12);
        const newUser = new User({ name, email, password: hashPassword });
        const newUserData = await newUser.save();
        const token = jwtHelper.encodeToken(newUserData);
        return { token };
    },
};
