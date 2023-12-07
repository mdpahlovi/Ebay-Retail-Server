import User from "../../models/user";

export const Query = {
    users: async () => await User.find({}),
    user: async (parent: any, args: { id: string }) => await User.findById(args.id),
};
