const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // Assuming you have a User model
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON data

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userRegistration', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// Registration route
app.post('/register', async (req, res) => {
  const { fname, lname, email, pass } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Create a new user
    const newUser = new User({
      fname,
      lname,
      email,
      pass,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(200).json({ message: 'Registration successful.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
