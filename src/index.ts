import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import config from "./config";
import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import { typeDefs } from "./graphql/schemas";
import { resolvers } from "./graphql/resolvers";

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

    app.use(cors(), bodyParser.json(), expressMiddleware(server));
    app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:${4000}`));
};

bootstrap();
