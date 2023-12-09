import { IUser } from "../../models/user/interface";
import Product from "../../models/product";
import booking from "../../models/booking";

export const User = {
    products: async ({ _id, role }: IUser) => {
        if (role === "seller") {
            return await Product.find({ seller: _id });
        } else {
            return null;
        }
    },
    bookings: async ({ _id, role }: IUser) => {
        switch (role) {
            case "buyer":
                return await booking.find({ buyer: _id });
            case "seller":
                return await booking.find({ seller: _id });
            case "admin":
                return null;
        }
    },
};
