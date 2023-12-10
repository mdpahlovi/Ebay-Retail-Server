import User from "../../../models/user";
import { Delete, Update } from "../../../types";
import { uploadImage } from "../../../utils/uploadImage";

interface User {
    name: string;
    phone: string;
    image: string;
    role: "buyer" | "seller" | "admin";
    isVerify: boolean;
}

export const UserMutation = {
    updateUser: async (parent: any, { id, data }: Update<User>) => {
        if (data?.image) data.image = await uploadImage(data.image, "Product");
        const user = await User.findByIdAndUpdate(id, data, { new: true });
        return user;
    },
    deleteUser: async (parent: any, { id }: Delete) => {
        const user = await User.findByIdAndDelete(id);
        return user;
    },
};
