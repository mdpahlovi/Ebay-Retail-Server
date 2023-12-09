import { IProduct } from "../../models/product/interface";
import Category from "../../models/category";
import User from "../../models/user";
import booking from "../../models/booking";

export const Product = {
    category: async ({ category }: IProduct) => await Category.findById(category),
    seller: async ({ seller }: IProduct) => await User.findById(seller),
    booking: async ({ _id }: IProduct) => await booking.findOne({ product: _id }),
};
