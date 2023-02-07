const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID!
    authors: String
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [String]
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    books: [Book]
    user: [User]
    user(id: ID!): User
 
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(userId: ID!, savedBooks: String!): User
    removeBook(userId: ID!, savedbooks: String!): User
  }
`;

module.exports = typeDefs;