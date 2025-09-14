// const express = require('express');
// const cors = require('cors');
// const admin = require('firebase-admin');
// const path = require('path');
// const { sendOTPEmail, verifyOTP } = require('./otpController');
// require('dotenv').config();

// // Load Firebase service account
// const serviceAccount = require(path.resolve(__dirname, './serviceAccountKey.json'));

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const db = admin.firestore();
// const app = express();

// app.use(cors());
// app.use(express.json());

// // Health check route
// app.get('/', (req, res) => res.send('Backend running ✅'));

// // Send OTP
// app.post('/send-otp', sendOTPEmail);

// // Verify OTP
// app.post('/verify-otp', verifyOTP);

// // Register User
// app.post('/register', async (req, res) => {
//   try {
//     const { name, email, mobile, password } = req.body;

//     // Validate fields
//     if (!name || !email || !mobile || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Name, email, mobile, and password are required'
//       });
//     }

//     // Create Firebase Authentication user
//     const userRecord = await admin.auth().createUser({
//       email,
//       password,
//       displayName: name
//     });

//     // Save additional details to Firestore
//     await db.collection('users').doc(userRecord.uid).set({
//       name,
//       email,
//       mobile,
//       createdAt: admin.firestore.FieldValue.serverTimestamp()
//     });

//     return res.json({
//       success: true,
//       message: 'User registered successfully',
//       uid: userRecord.uid
//     });
//   } catch (error) {
//     console.error('Error in /register:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Server error',
//       details: error.message
//     });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, "0.0.0.0", () =>
//   console.log(`✅ Backend listening on http://0.0.0.0:${PORT}`)
// );
