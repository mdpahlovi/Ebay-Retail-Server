import { Auth } from "./auth";
import { UserMutation } from "./user";

export const Mutation = {
    ...Auth,
    ...UserMutation,
};
