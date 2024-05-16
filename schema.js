const { gql } = require('@apollo/server');

// Define the GraphQL schema
const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Post {
    id: ID!
    userId: ID!
    content: String!
  }

  type Comment {
    id: ID!
    postId: ID!
    userId: ID!
    content: String!
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
    getPost(id: ID!): Post
    getAllPosts: [Post]
    getComment(id: ID!): Comment
    getAllComments: [Comment]
  }

  type Mutation {
    createUser(username: String!, email: String!): User
    createPost(userId: ID!, content: String!): Post
    createComment(postId: ID!, userId: ID!, content: String!): Comment
  }
`;

module.exports = typeDefs;
