import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import config from "./config/index.js";
import cookieParser from "cookie-parser";
import authorizeToken from "./modules/auth.js";
import { v2 as cloudinary } from "cloudinary";

import { typeDefs } from "./graphql/schemas/index.js";
import { resolvers } from "./graphql/resolvers/index.js";
import { jwtHelper } from "./utils/jwtHelper.js";
import corsOptions from "./utils/corsOptions.js";

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const bootstrap = async () => {
    await server.start();
    await mongoose.connect(config.mongodb_url!);

    // Middlewares
    app.use(cors(corsOptions));
    app.use(cookieParser());
    app.use(express.json());
    app.use(bodyParser.json({ limit: "64mb" }));
    app.use(authorizeToken);

    cloudinary.config({ cloud_name: config.cloud.name, api_key: config.cloud.api_key, api_secret: config.cloud.api_secret });

    app.use(
        expressMiddleware(server, {
            context: async ({ req, res }) => {
                const token = await jwtHelper.decodeToken(req);
                return { token, res };
            },
        })
    );

    app.listen({ port: config.port }, () => console.log(`🚀 Server ready at http://localhost:${config.port}`));
};

bootstrap();
