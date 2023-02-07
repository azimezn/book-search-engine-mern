import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addProfile(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $book: String!) {
    addBook(userId: $userId, book: $book) {
      _id
      books
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($book: String!) {
    removeBook(book: $book) {
      _id
      books
    }
  }
`;
