export type JwtPayload = {
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
    role: string;
    isVerify: boolean;
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
