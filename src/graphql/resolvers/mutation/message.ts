import Booking from "../../../models/booking/index.js";
import { Context } from "../../../types/index.js";

interface Message {
    id: string;
    type: "text" | "image" | "audio";
    content: string;
}

export const MessageMutation = {
    createMessage: async (parent: any, { id, type, content }: Message, { token, pubsub }: Context) => {
        let result;
        switch (type) {
            case "text":
                result = await Booking.findByIdAndUpdate(id, { $push: { messages: { user: token?.id, content } } }, { new: true });
                break;
            case "image":
                break;
            case "audio":
                break;
        }

        const newMessage = result.messages[result.messages.length - 1];
        pubsub.publish(`MESSAGE_CREATE_ON_ROOM:${id}`, { message: newMessage });

        return result;
    },
};
