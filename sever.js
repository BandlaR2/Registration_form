const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  password: "password",
  database: "login",
  host: "localhost",
  port: 5432
});

// Load environment variables from .env file
require('dotenv').config();

// Function to validate password
const isPasswordValid = (password) => {
  // Add your password validation logic here
  // Example: Password should have at least one capital letter, one lowercase letter, one special character, and one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
  return passwordRegex.test(password);
};

// Route for handling user registration
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate the password
  if (!isPasswordValid(password)) {
    return res.status(400).json({ error: 'Password does not meet the requirements.' });
  }

  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO public.users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
    const newUser = result.rows[0];
    res.status(201).json(newUser);
    console.log('Registration successful:', newUser);
    client.release();
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: err.message });
  }
});

// Route for handling user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM public.users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      // User not found
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Password doesn't match
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token in the response
    res.json({ token });
    client.release();
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: err.message });
  }
});

// Route for handling user logout
app.post('/logout', (req, res) => {
  // You can perform any necessary logout logic here (e.g., invalidate tokens, clear sessions)
  // For simplicity, this example just sends a success message
  res.json({ message: 'Logout successful' });
});

// Route to get count of users
app.get('/users/count', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT COUNT(*) FROM public.users');
    const count = result.rows[0].count;
    res.json({ count });
    client.release();
  } catch (err) {
    console.error('Error getting user count', err);
    res.status(500).json({ error: err.message });
  }
});

// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM public.users');
    const users = result.rows;
    res.json(users);
    client.release();
  } catch (err) {
    console.error('Error getting users', err);
    res.status(500).json({ error: err.message });
  }
});
// Route for handling user deletion
app.delete('/users/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const client = await pool.connect();
    
    // Check if the user exists
    const userResult = await client.query('SELECT * FROM public.users WHERE id = $1', [userId]);

    if (userResult.rows.length === 0) {
      // User not found
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user
    const deleteUserResult = await client.query('DELETE FROM public.users WHERE id = $1 RETURNING *', [userId]);
    const deletedUser = deleteUserResult.rows[0];

    res.json({ message: 'User deleted successfully', deletedUser });
    console.log('User deleted:', deletedUser);

    client.release();
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
