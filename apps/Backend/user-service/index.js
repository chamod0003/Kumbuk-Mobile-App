const express = require('express');
const { registerUser } = require('./userController');
const app = express();
app.use(express.json());

app.post('/register', registerUser);

app.get('/', (req, res) => res.send('User Service running'));

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => console.log(`User Service listening on port ${PORT}`));
