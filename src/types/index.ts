import { Response } from "express";
import { PubSub } from "graphql-subscriptions";

export type JwtPayload = {
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
    role: string;
    isVerify: boolean;
} | null;

export type Context = {
    token: JwtPayload | null;
    pubsub: PubSub;
    res: Response;
};

export type Update<T> = {
    id: string;
    data: T;
};

export type Delete = {
    id: string;
};
