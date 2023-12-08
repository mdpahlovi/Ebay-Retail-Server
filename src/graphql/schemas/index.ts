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
        createdAt: String
        updatedAt: String
    }

    type Product {
        id: ID
        category: Category
        name: String
        image: String
        resale_price: Float
        original_price: Float
        condition: String
        description: String
        location: String
        purchase_date: String
        seller: User
        advertised: Boolean
        isBooked: Boolean
        createdAt: String
        updatedAt: String
    }

    type Booking {
        date: String
        location: String
        buyer: User
        seller: User
        product: Product
        createdAt: String
        updatedAt: String
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

        products: [Product]
        product(id: ID!): Product
        advertise: [Product]

        bookings: [Booking]
        booking(id: ID!): Booking
    }

    type Mutation {
        login(email: String!): Token
        register(name: String!, email: String!, image: String!, isVerify: Boolean): Token

        updateUser(name: String, phone: String, image: String, role: String, isVerify: Boolean): User
        deleteUser(id: ID!): User

        createCategory(name: String!, image: String!): Category
        updateCategory(id: ID!, data: CategoryInput!): Category
        deleteCategory(id: ID!): Category

        createProduct(category: String!, name: String!, image: String!, resale_price: Float!, original_price: Float!, condition: String!, description: String!, location: String!, purchase_date: String!): Product
        updateProduct(id: ID!, data: ProductInput!): Product
        deleteProduct(id: ID!): Product

        createBooking(date: String!, location: String!, buyer: String!, seller: String!, product: String!): Booking
        updateBooking(id: ID!, data: BookingInput!): Booking
        deleteBooking(id: ID!): Booking
    }

    input CategoryInput {
        name: String
        image: String
    }

    input ProductInput {
        category: String
        name: String
        image: String
        resale_price: Float
        original_price: Float
        condition: String
        description: String
        location: String
        purchase_date: String
    }

    input BookingInput {
        date: String 
        location: String
    }
`;
