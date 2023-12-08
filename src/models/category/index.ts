import mongoose, { Schema } from "mongoose";
import { CategoryModel, ICategory } from "./interface";

const categorySchema = new Schema<ICategory>(
    {
        name: String,
        image: String,
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model<ICategory, CategoryModel>("category", categorySchema);
