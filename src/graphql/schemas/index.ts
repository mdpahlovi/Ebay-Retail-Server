export const typeDefs = `#graphql
    type User {
        id: ID
        name: String
        email: String
        image: String
        role: String
        isVerify: Boolean
        createdAt: String
        updatedAt: String
    }

    type Query {
        users: [User] 
        user(id: ID): User 
    }

    type Mutation {
        createUser(name: String, email: String, image: String, role: String, isVerify: Boolean): User
    }
`;
