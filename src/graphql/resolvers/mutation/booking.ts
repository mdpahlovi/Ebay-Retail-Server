import Booking from "../../../models/booking";
import { Delete, Update } from "../../../types";

interface Booking {
    date: string;
    location: string;
    buyer: string;
    seller: string;
    product: string;
}

export const BookingMutation = {
    createBooking: async (parent: any, args: Booking) => {
        const newBooking = new Booking(args);
        return await newBooking.save();
    },
    updateBooking: async (parent: any, { id, data }: Update<Booking>) => await Booking.findByIdAndUpdate(id, data, { new: true }),
    deleteBooking: async (parent: any, { id }: Delete) => await Booking.findByIdAndDelete(id),
};
