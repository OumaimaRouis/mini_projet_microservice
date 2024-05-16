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

// Implement social media service handlers
const userService = {
  getUser: (call, callback) => {
    const userData = {
      id: call.request.id,
      username: 'example_user',
      email: 'user@example.com',
    };
    callback(null, userData);
  },
  createUser: (call, callback) => {
    const { username, email } = call.request;
    const newUser = {
      id: '1',
      username,
      email,
    };
    callback(null, newUser);
  },
};

const postService = {
  getPost: (call, callback) => {
    const postData = {
      id: call.request.id,
      userId: '1',
      content: 'Example post content',
    };
    callback(null, postData);
  },
  createPost: (call, callback) => {
    const { userId, content } = call.request;
    const newPost = {
      id: '1',
      userId,
      content,
    };
    callback(null, newPost);
  },
};

const commentService = {
  getComment: (call, callback) => {
    const commentData = {
      id: call.request.id,
      postId: '1',
      userId: '1',
      content: 'Example comment content',
    };
    callback(null, commentData);
  },
  createComment: (call, callback) => {
    const { postId, userId, content } = call.request;
    const newComment = {
      id: '1',
      postId,
      userId,
      content,
    };
    callback(null, newComment);
  },
};

// Create and start gRPC server
const server = new grpc.Server();
server.addService(socialMediaProto.UserService.service, userService);
server.addService(socialMediaProto.PostService.service, postService);
server.addService(socialMediaProto.CommentService.service, commentService);
const port = 50051;
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }
  console.log(`Server is running on port ${port}`);
  server.start();
});
