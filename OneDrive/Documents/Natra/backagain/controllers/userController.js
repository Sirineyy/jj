// controllers/userController.js
const User = require('../schemas/baseUserSchema'); // Adjust the path to where your user.js is located
const bcrypt = require('bcrypt');
const mongoose=require('mongoose');
const parent= require('../schemas/parentSchema');




const createUser = async (req, res) => {
  if (mongoose.connection.readyState==("1")){
  try {
    // Destructure required fields from the request body
    const { name, email, password, phone } = req.body;

    // Validate required fields (name, email, and password)
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    // Hash the password using bcrypt before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new User instance with the provided details
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Save the hashed password
      phone
    });

    // Save the new user to the database
    await newUser.save();

    // Return a success response (excluding the password for security)
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    
    // Handle duplicate key error (e.g., email already exists)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists.' });
    }
    
    // Generic error response
    res.status(500).json({ message: 'Internal server error.' });
  }
}};

const createParent = async (req, res) => {
  if (mongoose.connection.readyState==("1")){
  try {
    // Destructure required fields from the request body
    const { name, email, password, phone, address } = req.body;

    // Validate required fields (name, email, and password)
    if (!name || !email || !password||!address) {
      return res.status(400).json({ message: 'ADDRESS REQUIRED FOR PARENT.' });
    }

    // Hash the password using bcrypt before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new User instance with the provided details
    const newParent = new parent({
      name,
      email,
      password: hashedPassword, // Save the hashed password
      phone,
      address
    });

    // Save the new user to the database
    await newParent.save();

    // Return a success response (excluding the password for security)
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newParent._id,
        name: newParent.name,
        email: newParent.email,
        phone: newParent.phone,
        role: newParent.role,
        address: newParent.address,
        createdAt: newParent.createdAt
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    
    // Handle duplicate key error (e.g., email already exists)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists.' });
    }
    
    // Generic error response
    res.status(500).json({ message: 'Internal server error.' });
  }
}};

module.exports = { createUser, createParent };
