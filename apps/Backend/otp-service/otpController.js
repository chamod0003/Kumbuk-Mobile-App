const nodemailer = require('nodemailer');

// Temporary in-memory OTP store: { email: { otp, expiresAt } }
const otpStore = {};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTPEmail(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }
  const otp = generateOTP();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 min expiry
  otpStore[email] = { otp, expiresAt };
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'speedcabs93@gmail.com',
        pass: 'urzxgbmycebihkpi', // Gmail App Password
      },
    });
    let mailOptions = {
      from: 'Speed Cabs <speedcabs93@gmail.com>',
      to: email,
      subject: 'Your OTP Code',
      html: `<h2>Your OTP code is: ${otp}</h2><p>Use this code within 5 minutes.</p>`
    };
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to send OTP', error: error.message });
  }
}

function verifyOTP(req, res) {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required' });
  }
  const record = otpStore[email];
  if (!record) {
    return res.status(400).json({ success: false, message: 'No OTP sent to this email' });
  }
  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ success: false, message: 'OTP expired' });
  }
  if (record.otp !== otp) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
  delete otpStore[email];
  return res.status(200).json({ success: true, message: 'OTP verified successfully' });
}

module.exports = { sendOTPEmail, verifyOTP };
