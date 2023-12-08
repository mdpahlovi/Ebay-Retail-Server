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

    type Category {
        id: ID
        name: String
        image: String
        total: Int
    }

    type Product {
        id: ID
        category: Category,
        name: String,
        image: String,
        resale_price: Float,
        original_price: Float,
        condition: String,
        description: String,
        location: String,
        phone: String,
        purchase_date: String,
        seller: User,
        advertised: Boolean,
        isBooked: Boolean,
    }

    type Booking {
        date: String,
        location: String,
        buyer: User,
        seller: User,
        product: Product,
    }

    type Token {
        token: String
    }

    type Query {
        allBuyer: [User]
        allSeller: [User] 
        user(id: ID!): User 

        categories: [Category]
        category(id: ID!): [Product]
    }

    type Mutation {
        login(email: String!): Token
        register(name: String!, email: String!, image: String!, isVerify: Boolean): Token

        updateUser(name: String, phone: String, image: String, role: String, isVerify: Boolean): User
        deleteUser(id: ID!): User

        createCategory(name: String!, image: String!): Category
        updateCategory(id: ID!, data: CategoryInput!): Category
        deleteCategory(id: ID!): Category
    }

    input CategoryInput {
        name: String
        image: String
    }
`;
