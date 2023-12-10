import { ICategory } from "../../models/category/interface";
import Product from "../../models/product";

export const Category = {
    total: async ({ _id }: ICategory) => await Product.countDocuments({ category: _id }),
    products: async ({ _id }: ICategory) => await Product.find({ category: _id }),
};
