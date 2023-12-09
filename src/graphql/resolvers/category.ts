import { ICategory } from "../../models/category/interface";
import Product from "../../models/product";

export const Category = {
    products: async ({ _id }: ICategory) => await Product.find({ category: _id }),
};
