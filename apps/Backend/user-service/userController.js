const admin = require('../shared/firebase');
const db = admin.firestore();

async function registerUser(req, res) {
  try {
    const { name, email, mobile, password } = req.body;
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, mobile, and password are required'
      });
    }
    // Create Firebase Authentication user
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name
    });
    // Save additional details to Firestore
    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      mobile,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    return res.json({
      success: true,
      message: 'User registered successfully',
      uid: userRecord.uid
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

module.exports = { registerUser };
