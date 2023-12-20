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
import corsOptions from "./utils/corsOptions";

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

    cloudinary.config({ cloud_name: config.cloud.name, api_key: config.cloud.api_key, api_secret: config.cloud.api_secret });

    app.use(
        "/graphql",
        cors(corsOptions),
        express.json(),
        bodyParser.json({ limit: "64mb" }),
        expressMiddleware(server, {
            context: async ({ req }): Promise<Token> => {
                const cookie = req.headers.cookie;
                const token = await jwtHelper.decodeToken(cookie ? cookie.split("=")[1] : "");
                return { token };
            },
        })
    );

    await new Promise<void>((resolve) => httpServer.listen({ port: config.port }, resolve));
    console.log(`🚀 Server ready at http://localhost:${config.port}/graphql`);
};

bootstrap();
