import { GraphQLError } from "graphql";
import config from "../config/index.js";
import Payment from "../models/payment/index.js";
import { Plan } from "../models/payment/interface.js";
import { IUser } from "../models/user/interface.js";

const getsslczdata = async (plan: Plan, user: IUser) => {
    const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    const tran_id = timestamp + "xxxxxxxxxxxxxxxx".replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16)).toLowerCase();

    let total_amount: number;
    switch (plan) {
        case "starter":
            total_amount = 0;
            break;
        case "professional":
            total_amount = 99;
            break;
        case "enterprise":
            total_amount = 199;
            break;
    }

    let payment_id: string;
    const isExist = await Payment.findOne({ user_id: user.id });
    if (isExist?._id) {
        if (isExist?.status === "success" && isExist?.plan === plan) {
            throw new GraphQLError("This Plan Already Active");
        } else {
            const payment = await Payment.findByIdAndUpdate(isExist?.id, { plan });
            payment_id = payment._id;
        }
    } else {
        const newPayment = new Payment({ user_id: user.id, tran_id, plan, status: "padding" });
        const payment = await newPayment.save();
        payment_id = payment._id;
    }

    return {
        total_amount,
        currency: "BDT",
        tran_id,
        success_url: `${config.server_url}/success/${payment_id}`,
        fail_url: `${config.server_url}/fail/${payment_id}`,
        cancel_url: `${config.server_url}/cancel/${payment_id}`,
        ipn_url: `${config.server_url}/ipn`,
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: user.name,
        cus_email: user.email,
        cus_add1: user.address,
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: user.phone,
        cus_fax: user.phone,
        ship_name: user.name,
        ship_add1: user.address,
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
    };
};

export default getsslczdata;
