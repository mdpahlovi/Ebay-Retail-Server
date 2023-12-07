import User from "../../../models/user";

interface CreateUser {
    name: string;
    email: string;
    image: string;
    role: string;
    isVerify: boolean;
}

export const Mutation = {
    createUser: async (parent: any, args: CreateUser) => {
        const newUser = new User(args);
        return await newUser.save();
    },
};
