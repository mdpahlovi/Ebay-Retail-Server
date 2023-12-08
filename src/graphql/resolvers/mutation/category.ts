import Category from "../../../models/category";
import { Delete, Update } from "../../../types";

interface Category {
    name: String;
    image: String;
}

export const CategoryMutation = {
    createCategory: async (parent: any, args: Category) => {
        const newCategory = new Category(args);
        return await newCategory.save();
    },
    updateCategory: async (parent: any, { id, data }: Update<Category>) => await Category.findByIdAndUpdate(id, data, { new: true }),
    deleteCategory: async (parent: any, { id }: Delete) => await Category.findByIdAndDelete(id),
};
