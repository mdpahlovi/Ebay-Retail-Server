import { Auth } from "./auth";
import { UserMutation } from "./user";
import { CategoryMutation } from "./category";

export const Mutation = {
    ...Auth,
    ...UserMutation,
    ...CategoryMutation,
};
