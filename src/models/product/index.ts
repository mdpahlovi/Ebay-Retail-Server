import mongoose, { InferSchemaType, Schema } from "mongoose";
import { IProduct, ProductModel } from "./interface";
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new Schema<IProduct>(
    {
        category: { type: ObjectId, ref: "category" },
        name: String,
        image: String,
        resale_price: Number,
        original_price: Number,
        condition: String,
        description: String,
        location: String,
        purchase_date: Date,
        seller: { type: ObjectId, ref: "user" },
        advertised: Boolean,
        isBooked: Boolean,
    },
    { timestamps: true }
);

export default mongoose.model<IProduct, ProductModel>("product", productSchema);
