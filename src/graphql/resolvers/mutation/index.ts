import { Auth } from "./auth";
import { UserMutation } from "./user";
import { CategoryMutation } from "./category";
import { ProductMutation } from "./product";

export const Mutation = {
    ...Auth,
    ...UserMutation,
    ...CategoryMutation,
    ...ProductMutation,
};
