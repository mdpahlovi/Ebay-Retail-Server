import { PubSub } from "graphql-subscriptions";
import { jwtHelper } from "../../utils/jwtHelper";

export const context = async ({ req, res }) => {
    const pubsub = new PubSub();
    const token = await jwtHelper.decodeToken(req);
    return { token, pubsub, res };
};
