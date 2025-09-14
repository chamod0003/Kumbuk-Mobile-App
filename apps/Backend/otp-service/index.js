const express = require('express');
const { sendOTPEmail, verifyOTP } = require('./otpController');
const app = express();
app.use(express.json());

app.post('/send-otp', sendOTPEmail);
app.post('/verify-otp', verifyOTP);

app.get('/', (req, res) => res.send('OTP Service running'));

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`OTP Service listening on port ${PORT}`));
