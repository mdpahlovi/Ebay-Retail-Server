import User from "../../models/user";
import { jwtHelper } from "../../utils/jwtHelper";

interface Login {
    email: string;
}
interface Register {
    name: string;
    email: string;
    image: string;
    isVerify: boolean;
}

export const Mutation = {
    login: async (parent: any, args: Login) => {
        const user = await User.findOne({ email: args.email });
        const token = jwtHelper.generateToken({ id: user?._id!, role: user?.role! });
        return { token };
    },
    register: async (parent: any, args: Register) => {
        const user = await User.findOne({ email: args.email });
        if (user) {
            const token = jwtHelper.generateToken({ id: user?._id!, role: user?.role! });
            return { token };
        } else {
            const newUser = new User(args);
            const user = await newUser.save();
            const token = jwtHelper.generateToken({ id: user?._id!, role: user?.role! });
            return { token };
        }
    },
};
