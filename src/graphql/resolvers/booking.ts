import { IBooking } from "../../models/booking/interface";
import User from "../../models/user";
import Product from "../../models/product";

export const Booking = {
    buyer: async ({ buyer }: IBooking) => await User.findById(buyer),
    seller: async ({ seller }: IBooking) => await User.findById(seller),
    product: async ({ product }: IBooking) => await Product.findById(product),
};
