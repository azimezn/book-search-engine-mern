const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    bookId: String!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    boookCount: Int
    savedBooks: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    books: [Book]
    user: [User]
    user(id: ID!): User
    me: User
 
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(authors: [String], description: String, title: String, bookId: String, image: Strink, link: String): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;