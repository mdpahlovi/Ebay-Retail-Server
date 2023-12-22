import { categoryLoader } from "../../dataLoaders/product/categoryLoader";
import { userLoader } from "../../dataLoaders/userLoader";
import { bookingLoader } from "../../dataLoaders/product/isBookingLoader";

export const Product = {
    category: async ({ category }: { category: string }) => categoryLoader.load(category),
    seller: async ({ seller }: { seller: string }) => userLoader.load(seller),
    isBooked: async ({ _id }: { _id: string }) => bookingLoader.load(_id),
};
