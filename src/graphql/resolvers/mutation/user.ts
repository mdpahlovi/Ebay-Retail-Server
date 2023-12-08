import User from "../../../models/user";
import { Delete, Token } from "../../../types";

interface User {
    name: string;
    phone: string;
    image: string;
    role: "buyer" | "seller" | "admin";
    isVerify: boolean;
}

export const UserMutation = {
    updateUser: async (parent: any, args: User, { token }: Token) => {
        const user = await User.findByIdAndUpdate(token?.id, args, { new: true });
        return user;
    },
    deleteUser: async (parent: any, { id }: Delete) => {
        const user = await User.findByIdAndDelete(id);
        return user;
    },
};
