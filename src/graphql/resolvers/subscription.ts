import { Context } from "../../types";

export const Subscription = {
    onMessageCreated: {
        subscribe: async (parent: any, { id }: { id: string }, { pubsub }: Context) => pubsub.asyncIterator(`MESSAGE_CREATE_ON_ROOM:${id}`),
    },
};
