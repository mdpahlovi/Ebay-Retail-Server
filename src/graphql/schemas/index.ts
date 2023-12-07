export const typeDefs = `#graphql
    type User {
        id: ID
        name: String
        email: String
        phone: String
        image: String
        role: String
        isVerify: Boolean
        createdAt: String
        updatedAt: String
    }

    type Token {
        token: String
    }

    type Query {
        users: [User] 
        user(id: ID): User 
    }

    type Mutation {
        login(email: String): Token
        register(name: String, email: String, image: String, isVerify: Boolean): Token
    }
`;
