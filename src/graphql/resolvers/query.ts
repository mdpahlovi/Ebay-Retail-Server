import User from "../../models/user";
import Category from "../../models/category";
import Product from "../../models/product";
import Booking from "../../models/booking";
import { Token } from "../../types";

export const Query = {
    allBuyer: async () => await User.find({ role: "buyer" }),
    allSeller: async () => await User.find({ role: "seller" }),
    user: async (parent: any, { id }: { id: string }) => await User.findById(id),

    categories: async () =>
        await Category.aggregate([
            { $lookup: { from: "products", localField: "_id", foreignField: "category", as: "products" } },
            { $project: { id: "$_id", name: 1, image: 1, total: { $size: "$products" } } },
        ]),
    category: async (parent: any, { id }: { id: string }) => await Product.find({ category: id }).populate(["category", "seller"]),

    products: async (parent: any, args: any, { token }: Token) =>
        await Product.find({ seller: token?.id }).populate(["category", "seller"]),
    product: async (parent: any, { id }: { id: string }) => await Product.findById(id).populate(["category", "seller"]),
    advertise: async () => await Product.find({ advertised: true }).populate(["category", "seller"]),

    bookings: async (parent: any, args: any, { token }: Token) => {
        switch (token?.role) {
            case "buyer":
                return await Booking.find({ buyer: token?.id }).populate(["buyer", "seller", "product"]);
            case "seller":
                return await Booking.find({ seller: token?.id }).populate(["buyer", "seller", "product"]);
        }
    },
    booking: async (parent: any, { id }: { id: string }) => await Product.findById(id).populate(["buyer", "seller", "product"]),
};
