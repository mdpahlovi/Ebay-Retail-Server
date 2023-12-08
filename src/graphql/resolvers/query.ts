import User from "../../models/user";

export const Query = {
    allBuyer: async () => await User.find({ role: "buyer" }),
    allSeller: async () => await User.find({ role: "seller" }),
    user: async (parent: any, args: { id: string }) => await User.findById(args.id),
};
