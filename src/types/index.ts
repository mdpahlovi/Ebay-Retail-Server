export type JwtPayload = {
    id: string;
    role: string;
} | null;

export type Token = {
    token: JwtPayload | null;
};

export type Update<T> = {
    id: string;
    data: T;
};

export type Delete = {
    id: string;
};
