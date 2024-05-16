const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load socialMedia.proto file
const socialMediaProtoPath = 'socialMedia.proto';
const socialMediaProtoDefinition = protoLoader.loadSync(socialMediaProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const socialMediaProto = grpc.loadPackageDefinition(socialMediaProtoDefinition).socialMedia;

// Define gRPC clients for each service
const userServiceClient = new socialMediaProto.UserService('localhost:50051', grpc.credentials.createInsecure());
const postServiceClient = new socialMediaProto.PostService('localhost:50051', grpc.credentials.createInsecure());
const commentServiceClient = new socialMediaProto.CommentService('localhost:50051', grpc.credentials.createInsecure());

const resolvers = {
  Query: {
    getUser: (_, { id }) => {
      return new Promise((resolve, reject) => {
        userServiceClient.getUser({ id }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      });
    },
    getPost: (_, { id }) => {
      return new Promise((resolve, reject) => {
        postServiceClient.getPost({ id }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      });
    },
    getComment: (_, { id }) => {
      return new Promise((resolve, reject) => {
        commentServiceClient.getComment({ id }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      });
    },
  },
  Mutation: {
    createUser: (_, { username, email }) => {
      return new Promise((resolve, reject) => {
        userServiceClient.createUser({ username, email }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      });
    },
    createPost: (_, { userId, content }) => {
      return new Promise((resolve, reject) => {
        postServiceClient.createPost({ userId, content }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      });
    },
    createComment: (_, { postId, userId, content }) => {
      return new Promise((resolve, reject) => {
        commentServiceClient.createComment({ postId, userId, content }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      });
    },
  },
};

module.exports = resolvers;
