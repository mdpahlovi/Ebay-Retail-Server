import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import config from "./config";
import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { v2 as cloudinary } from "cloudinary";

import { Token } from "./types";
import { typeDefs } from "./graphql/schemas";
import { resolvers } from "./graphql/resolvers";
import { jwtHelper } from "./utils/jwtHelper";

const { port, mongodb_url } = config;
const app = express();
const httpServer = http.createServer(app);

const bootstrap = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    await mongoose.connect(mongodb_url!);
    cloudinary.config({ cloud_name: config.cloud.name, api_key: config.cloud.api_key, api_secret: config.cloud.api_secret });

    app.use(
        cors(),
        bodyParser.json(),
        expressMiddleware(server, {
            context: async ({ req }): Promise<Token> => {
                const token = await jwtHelper.decodeToken(req.headers.authorization!);

                return { token };
            },
        })
    );
    app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${4000}`));
};

bootstrap();
