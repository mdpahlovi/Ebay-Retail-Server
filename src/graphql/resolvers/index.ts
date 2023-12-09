import { Query } from "./query";
import { Auth } from "./mutation/auth";
import { UserMutation } from "./mutation/user";
import { CategoryMutation } from "./mutation/category";
import { ProductMutation } from "./mutation/product";
import { BookingMutation } from "./mutation/booking";

export const resolvers = {
    Query,
    Mutation: {
        ...Auth,
        ...UserMutation,
        ...CategoryMutation,
        ...ProductMutation,
        ...BookingMutation,
    },
};
