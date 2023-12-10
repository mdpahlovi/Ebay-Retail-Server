import Product from "../../../models/product";
import { Delete, Token, Update } from "../../../types";
import { uploadImage } from "../../../utils/uploadImage";

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
    createProduct: async (parent: any, args: Product, { token }: Token) => {
        if (args?.image) args.image = await uploadImage(args.image, "Product");
        const data = { ...args, seller: token?.id };
        const newProduct = new Product(data);
        return await newProduct.save();
    },
    updateProduct: async (parent: any, { id, data }: Update<Product>) => {
        if (data?.image) data.image = await uploadImage(data.image, "Product");
        return await Product.findByIdAndUpdate(id, data, { new: true });
    },
    deleteProduct: async (parent: any, { id }: Delete) => await Product.findByIdAndDelete(id),
};
