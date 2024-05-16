const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// MongoDB connection URL
const MONGODB = process.env.MONGO_URL;

// Import GraphQL type definitions and resolvers
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Connect to MongoDB and start the Apollo Server
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: 5001 });
  })
  .then(({ url }) => {
    console.log(`Customers Microservices running at ${url}`);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
