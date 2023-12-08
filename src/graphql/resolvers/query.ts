import User from "../../models/user";
import Category from "../../models/category";
import Product from "../../models/product";

export const Query = {
    allBuyer: async () => await User.find({ role: "buyer" }),
    allSeller: async () => await User.find({ role: "seller" }),
    user: async (parent: any, args: { id: string }) => await User.findById(args.id),

    categories: async () =>
        await Category.aggregate([
            { $lookup: { from: "products", localField: "_id", foreignField: "category", as: "products" } },
            { $project: { id: "$_id", name: 1, image: 1, total: { $size: "$products" } } },
        ]),
    category: async (parent: any, args: { id: string }) => await Product.findById(args.id).populate(["category", "seller"]),
};
