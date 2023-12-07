import mongoose, { Schema } from "mongoose";
import { BookingModel, IBooking } from "./interface";
const { ObjectId } = mongoose.Schema.Types;

const bookingSchema = new Schema<IBooking>(
    {
        date: String,
        location: String,
        buyer: { type: ObjectId, ref: "user" },
        seller: { type: ObjectId, ref: "user" },
        product: { type: ObjectId, ref: "product" },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model<IBooking, BookingModel>("blog", bookingSchema);
