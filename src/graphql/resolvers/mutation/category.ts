import Category from "../../../models/category";
import { Delete, Update } from "../../../types";
import { uploadImage } from "../../../utils/uploadImage";

interface Category {
    name: string;
    image: string;
}

export const CategoryMutation = {
    createCategory: async (parent: any, args: Category) => {
        if (args?.image) args.image = await uploadImage(args.image, "Category");
        const newCategory = new Category(args);
        return await newCategory.save();
    },
    updateCategory: async (parent: any, { id, data }: Update<Category>) => {
        if (data?.image) data.image = await uploadImage(data.image, "Category");
        return await Category.findByIdAndUpdate(id, data, { new: true });
    },
    deleteCategory: async (parent: any, { id }: Delete) => await Category.findByIdAndDelete(id),
};
