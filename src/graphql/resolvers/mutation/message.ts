import Booking from "../../../models/booking/index.js";
import { Context } from "../../../types/index.js";

interface Message {
    id: string;
    type: "text" | "image" | "audio";
    content: string;
}

export const MessageMutation = {
    createMessage: async (parent: any, { id, type, content }: Message, { token }: Context) => {
        switch (type) {
            case "text":
                return await Booking.findByIdAndUpdate(id, { $push: { messages: { user: token?.id, content } } }, { new: true });
            case "image":
                return;
            case "audio":
                return;
        }
    },
};
