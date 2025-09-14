// apiGateway.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const SECRET_KEY = 'your_secret_key'; // Change this to a secure key in production

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Example login route (issues JWT)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Replace with real user validation
  if (username === 'test' && password === 'password') {
    const user = { username };
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

// Example protected route
app.get('/user/profile', authenticateToken, (req, res) => {
  // Forward to user service or return dummy data
  res.json({ user: req.user, profile: 'This is your profile data.' });
});

// Example public route
app.get('/', (req, res) => {
  res.send('API Gateway is running');
});

app.listen(3000, () => console.log('API Gateway running on port 3000'));
