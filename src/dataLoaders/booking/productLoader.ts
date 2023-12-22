import DataLoader from "dataloader";
import { IProduct } from "../../models/product/interface";
import Product from "../../models/product";

const batchProducts = async (ids: string[]): Promise<IProduct[]> => {
    const products = await Product.find({ _id: { $in: ids } });

    const productData: { [key: string]: IProduct } = {};
    products.forEach((product) => {
        productData[product.id] = product;
    });

    return ids.map((id) => productData[id]);
};

export const productLoader = new DataLoader<string, IProduct>(batchProducts);
