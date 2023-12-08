import Product from "../../../models/product";
import { Delete, Update } from "../../../types";

interface Product {
    category: string;
    name: string;
    image: string;
    resale_price: number;
    original_price: number;
    condition: string;
    description: string;
    location: string;
    purchase_date: string;
}

export const ProductMutation = {
    createProduct: async (parent: any, args: Product) => {
        const newProduct = new Product(args);
        return await newProduct.save();
    },
    updateProduct: async (parent: any, { id, data }: Update<Product>) => await Product.findByIdAndUpdate(id, data, { new: true }),
    deleteProduct: async (parent: any, { id }: Delete) => await Product.findByIdAndDelete(id),
};
