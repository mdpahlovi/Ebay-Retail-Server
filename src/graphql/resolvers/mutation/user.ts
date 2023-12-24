import User from "../../../models/user/index.js";
import { Delete, Update } from "../../../types/index.js";
import { uploadImage } from "../../../utils/uploadImage.js";

interface User {
    name: string;
    phone: string;
    image: string;
    role: "buyer" | "seller" | "admin";
    isVerify: boolean;
}

export const UserMutation = {
    updateUser: async (parent: any, { id, data }: Update<User>) => {
        const user = await User.findById(id, { image: 1 });
        if (data?.image !== user?.image) data.image = await uploadImage(data.image, "User");
        return await User.findByIdAndUpdate(id, data, { new: true });
    },
    deleteUser: async (parent: any, { id }: Delete) => {
        const user = await User.findByIdAndDelete(id);
        return user;
    },
};
