const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { connect: kafkaConnect, sendMessage } = require('./kafka/producer');
const { connect: consumerConnect, consumeMessages } = require('./kafka/consumer');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mongoose connection
mongoose.connect('mongodb://localhost:27017/miniProjet', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Mongoose models
const Post = mongoose.model('Post', {
  title: String,
  content: String,
});

const User = mongoose.model('User', {
  username: String,
  email: String,
  // Add more fields as needed
});

// Kafka setup
(async () => {
  await kafkaConnect();
  console.log('Kafka producer connected');
  await consumerConnect();
  console.log('Kafka consumer connected');
  consumeMessages('test-topic');
})();

// GET method to retrieve posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST method to create a post
app.post('/posts', async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({ title, content });
    await post.save();
    sendMessage('test-topic', post);
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET method to retrieve users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST method to create a user
app.post('/users', async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = new User({ username, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`API Gateway is running on port ${port}`);
});
