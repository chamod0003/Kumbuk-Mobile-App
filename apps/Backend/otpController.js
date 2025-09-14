// const nodemailer = require("nodemailer");

// // Temporary in-memory OTP store: { email: { otp, expiresAt } }
// const otpStore = {};

// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// async function sendOTPEmail(req, res) {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ success: false, message: "Email is required" });
//   }

//   const otp = generateOTP();
//   const expiresAt = Date.now() + 5 * 60 * 1000; // 5 min expiry

//   otpStore[email] = { otp, expiresAt };

//   try {
//     let transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "speedcabs93@gmail.com",
//         pass: "urzxgbmycebihkpi", // Gmail App Password
//       },
//     });

//     let mailOptions = {
//       from: '"Speed Cabs-Akuressa" <speedcabs93@gmail.com>',
//       to: email,
//       subject: "Your OTP Code",
//       html: `
//         <html>
//           <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
//             <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
//               <h2 style="text-align: center; color: #004aad;">Speed Cabs - OTP Verification</h2>
//               <p style="font-size: 16px;">Hello,</p>
//               <p style="font-size: 16px;">Your OTP code is:</p>
//               <div style="text-align: center; margin: 20px 0;">
//                 <span style="font-size: 24px; font-weight: bold; background-color: #f9f9f9; padding: 10px 20px; border-radius: 8px; color: #004aad;">
//                   ${otp}
//                 </span>
//               </div>
//               <p style="font-size: 16px;">Please use this code within 5 minutes.</p>
//               <p style="font-size: 16px;">Thank you,<br>Speed Cabs Akuressa Team</p>
//             </div>
//           </body>
//         </html>
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     return res.status(200).json({ success: true, message: "OTP sent successfully" });

//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     return res.status(500).json({ success: false, message: "Failed to send OTP", error: error.message });
//   }
// }

// function verifyOTP(req, res) {
//   const { email, otp } = req.body;

//   if (!email || !otp) {
//     return res.status(400).json({ success: false, message: "Email and OTP are required" });
//   }

//   const record = otpStore[email];
//   if (!record) {
//     return res.status(400).json({ success: false, message: "No OTP found for this email" });
//   }

//   if (Date.now() > record.expiresAt) {
//     delete otpStore[email];
//     return res.status(400).json({ success: false, message: "OTP expired" });
//   }

//   if (record.otp !== otp) {
//     return res.status(400).json({ success: false, message: "Invalid OTP" });
//   }

//   // OTP is valid
//   delete otpStore[email];
//   return res.json({ success: true, message: "OTP verified successfully" });
// }

// module.exports = { sendOTPEmail, verifyOTP };


// otpController.js
const nodemailer = require("nodemailer");

// In-memory OTP store: { email: { otp, expiresAt, attempts } }
const otpStore = {};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTPEmail(req, res) {
  try {
    const { email } = req.body;
    
    console.log("Send OTP request received for email:", email); // Debug log

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiry
    
    // Store OTP with expiration and attempt tracking
    otpStore[email] = { 
      otp, 
      expiresAt,
      attempts: 0 
    };

    console.log(`Generated OTP for ${email}: ${otp} (expires at ${new Date(expiresAt)})`); // Debug log

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "speedcabs93@gmail.com",
        pass: "urzxgbmycebihkpi", // Your Gmail App Password
      },
    });

    let mailOptions = {
      from: '"FixLio-kumbuk" <speedcabs93@gmail.com>',
      to: email,
      subject: "Your OTP Code",
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
              <h2 style="text-align: center; color: #004aad;">FixLio - OTP Verification</h2>
              <p style="font-size: 16px;">Hello,</p>
              <p style="font-size: 16px;">Your OTP code is:</p>
              <div style="text-align: center; margin: 20px 0;">
                <span style="font-size: 24px; font-weight: bold; background-color: #f9f9f9; padding: 10px 20px; border-radius: 8px; color: #004aad;">
                  ${otp}
                </span>
              </div>
              <p style="font-size: 16px;">Please use this code within 5 minutes.</p>
              <p style="font-size: 16px;">Thank you,<br>FixLio-kumbuk Team</p>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent successfully to ${email}`); // Debug log

    return res.status(200).json({ success: true, message: "OTP sent successfully" });
    
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to send OTP", 
      error: error.message 
    });
  }
}

function verifyOTP(req, res) {
  try {
    const { email, otp } = req.body;
    
    console.log("OTP verification request:", { email, otp }); // Debug log
    console.log("Current OTP store:", otpStore); // Debug log

    if (!email || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and OTP are required" 
      });
    }

    const storedOtpData = otpStore[email];
    console.log("Stored OTP data for email:", storedOtpData); // Debug log
    
    if (!storedOtpData) {
      return res.status(400).json({ 
        success: false, 
        message: "No OTP found for this email. Please request a new OTP." 
      });
    }

    // Check if OTP has expired
    if (Date.now() > storedOtpData.expiresAt) {
      delete otpStore[email]; // Clean up expired OTP
      console.log("OTP expired for email:", email); // Debug log
      return res.status(400).json({ 
        success: false, 
        message: "OTP has expired. Please request a new OTP." 
      });
    }

    // Check attempt limit (prevent brute force)
    if (storedOtpData.attempts >= 3) {
      delete otpStore[email]; // Clean up after too many attempts
      console.log("Too many attempts for email:", email); // Debug log
      return res.status(400).json({ 
        success: false, 
        message: "Too many invalid attempts. Please request a new OTP." 
      });
    }

    // Convert both to strings for comparison to avoid type issues
    const inputOtp = otp.toString().trim();
    const storedOtp = storedOtpData.otp.toString().trim();
    
    console.log("OTP comparison:", { inputOtp, storedOtp, match: inputOtp === storedOtp }); // Debug log

    if (storedOtp !== inputOtp) {
      storedOtpData.attempts++; // Increment attempt counter
      console.log("Invalid OTP attempt for email:", email, "Attempts:", storedOtpData.attempts); // Debug log
      return res.status(400).json({ 
        success: false, 
        message: "Invalid OTP. Please try again." 
      });
    }

    // OTP is valid - clean up
    delete otpStore[email];
    console.log("OTP verified successfully for email:", email); // Debug log

    return res.json({ 
      success: true, 
      message: "OTP verified successfully" 
    });

  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to verify OTP",
      error: error.message 
    });
  }
}

// Optional: Clean up expired OTPs periodically
setInterval(() => {
  const now = Date.now();
  for (const email in otpStore) {
    if (otpStore[email].expiresAt < now) {
      console.log("Cleaning up expired OTP for:", email); // Debug log
      delete otpStore[email];
    }
  }
}, 60000); // Clean up every minute

module.exports = { sendOTPEmail, verifyOTP };