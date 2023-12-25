import { PubSub } from "graphql-subscriptions";
import { jwtHelper } from "../../utils/jwtHelper.js";

const pubsub = new PubSub();

export const context = async ({ req, res }) => {
    const token = await jwtHelper.decodeToken(req);
    return { token, pubsub, res };
};
