import path from "path";
require("dotenv").config({ path: path.join(process.cwd(), ".env") });

export default {
    port: process.env.PORT,
    mongodb_url: process.env.MONGODB_URL,
    jwt: { secret: process.env.JWT_SIGN },
};
