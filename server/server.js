const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 5000;

const USERS_FILE = path.join(__dirname, 'users.json');
const DETAILS_FILE = path.join(__dirname, 'details.json');

// Serve the built React client
const CLIENT_DIST = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
}

app.use(cors());
app.use(express.json());

// Rate limiter for API routes (100 requests per 15 minutes per IP)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
});

function readJSON(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(`Error reading ${filePath}:`, err.message);
    }
    return [];
  }
}

function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err.message);
    throw err;
  }
}

// POST /api/users — save user data to both JSON files
app.post('/api/users', apiLimiter, (req, res) => {
  const { userId, name, age, address } = req.body;

  if (!userId || !name || !age || !address) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const users = readJSON(USERS_FILE);
  const details = readJSON(DETAILS_FILE);

  const existingUser = users.find((u) => u.userId === userId);
  if (existingUser) {
    return res.status(409).json({ error: 'User ID already exists.' });
  }

  users.push({ userId, name });
  details.push({ userId, age, address });

  try {
    writeJSON(USERS_FILE, users);
    writeJSON(DETAILS_FILE, details);
  } catch {
    return res.status(500).json({ error: 'Failed to save user data.' });
  }

  res.status(201).json({ message: 'User created successfully.' });
});

// GET /api/users/:userId — fetch combined user data
app.get('/api/users/:userId', apiLimiter, (req, res) => {
  const { userId } = req.params;

  const users = readJSON(USERS_FILE);
  const details = readJSON(DETAILS_FILE);

  const user = users.find((u) => u.userId === userId);
  const detail = details.find((d) => d.userId === userId);

  if (!user || !detail) {
    return res.status(404).json({ error: 'User not found.' });
  }

  res.json({
    userId: user.userId,
    name: user.name,
    age: detail.age,
    address: detail.address,
  });
});

// Rate limiter for static file catch-all (200 requests per 15 minutes per IP)
const staticLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

// Catch-all: serve React app for client-side routing
if (fs.existsSync(CLIENT_DIST)) {
  app.get('*', staticLimiter, (req, res) => {
    res.sendFile(path.join(CLIENT_DIST, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
