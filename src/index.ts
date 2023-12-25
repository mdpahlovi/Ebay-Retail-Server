import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import config from "./config/index.js";
import cookieParser from "cookie-parser";
import authorizeToken from "./modules/auth.js";
import { v2 as cloudinary } from "cloudinary";

import { typeDefs } from "./graphql/schemas/index.js";
import { resolvers } from "./graphql/resolvers/index.js";
import { context } from "./graphql/context/index.js";
import corsOptions from "./utils/corsOptions.js";

const app = express();
const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });
const wsServer = new WebSocketServer({ server: httpServer, path: "/subscription" });
const serverCleanup = useServer({ schema }, wsServer);
const server = new ApolloServer({
    schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});

const {
    mongodb_url,
    cloud: { cloud_name, api_key, api_secret },
    port,
} = config;

await server.start();
await mongoose.connect(mongodb_url!);

// Middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ limit: "64mb" }));
app.use(authorizeToken);

cloudinary.config({ cloud_name, api_key, api_secret });

app.use("/graphql", expressMiddleware(server, { context }));

httpServer.listen(port, () => console.log(`🚀 Server Running On http://localhost:${port}/graphql`));
