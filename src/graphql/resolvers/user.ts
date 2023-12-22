import { IUser } from "../../models/user/interface";
import Product from "../../models/product";
import booking from "../../models/booking";

export const User = {
    totalProduct: async ({ _id, role }: IUser) => {
        if (role === "seller") {
            return await Product.countDocuments({ seller: _id });
        } else {
            return null;
        }
    },
    totalBooking: async ({ _id, role }: IUser) => {
        switch (role) {
            case "buyer":
                return await booking.countDocuments({ buyer: _id });
            case "seller":
                return await booking.countDocuments({ seller: _id });
            case "admin":
                return null;
        }
    },
};
