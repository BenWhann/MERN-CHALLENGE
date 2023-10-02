const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    savedBooks: [Book]!
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {

  }

  type Query {
    me: User
  }

  input BookInput {
    bookId: String
    description: String
    image: String
    link: String
    title: String
    authors: [String]
  }

  type Query {
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(newSavedBook: BookInput!): User
    deleteBook(bookId: String!): User
  }
`;

module.exports = typeDefs;