const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://riyakansal2901:RI290102@cluster0.bz2ga3v.mongodb.net/GMS?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Define the user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Create the user model
const User = mongoose.model('User', userSchema);

// Create Express application
const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Create a POST route for handling login form submission
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save()
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error saving user to MongoDB:', error);
      res.sendStatus(500);
    });
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
