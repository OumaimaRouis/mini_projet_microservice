const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const { SocialMediaService } = require('./socialMedia');
const { producer } = require('./kafka/producer');
const { consumer } = require('./kafka/consumer');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Create an Express server
const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(cors());

async function startServer() {
  // Create an Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Set up the Apollo Server middleware
  await server.start();
  app.use('/graphql', expressMiddleware(server));

  // Start the Express server
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  // Start the gRPC server
  const grpcServer = new SocialMediaService();
  grpcServer.start();

  // Start the Kafka producer and consumer
  producer.connect();
  consumer.connect();
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
