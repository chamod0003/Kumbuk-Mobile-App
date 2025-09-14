// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import axios from "axios";

// const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.4:3000";

// export default function OTP() {
//   const router = useRouter();
//   const { name, email, mobile, password } = useLocalSearchParams();
//   const [otpInput, setOtpInput] = useState("");

//   const verifyOTP = async () => {
//     if (otpInput.length !== 6) {
//       Alert.alert("Error", "Please enter a valid 6-digit OTP");
//       return;
//     }

//     try {
//       console.log("Sending OTP verification request:", { email, otp: otpInput });
      
//       const res = await axios.post(`${API_BASE_URL}/verify-otp`, { 
//         email, 
//         otp: otpInput 
//       }, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       console.log("OTP verification response:", res.data);

//       if (res.data.success) {
//         // Create user account after OTP success
//         const createUserRes = await axios.post(`${API_BASE_URL}/register`, {
//           name,
//           email,
//           mobile,
//           password
//         });

//         if (createUserRes.data.success) {
//           Alert.alert("Success", "Account created successfully!", [
//             { text: "OK", onPress: () => router.push("/sign_in") },
//           ]);
//         } else {
//           Alert.alert("Error", createUserRes.data.message || "Failed to create account");
//         }
//       } else {
//         Alert.alert("Error", res.data.message || "Invalid OTP");
//       }
//     } catch (error) {
//       console.error("OTP Verification Error Details:", {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//         requestData: { email, otp: otpInput }
//       });
      
//       if (error.response?.data?.message) {
//         Alert.alert("Error", error.response.data.message);
//       } else {
//         Alert.alert("Error", "Could not verify OTP. Please try again.");
//       }
//     }
//   };

//   const resendOTP = async () => {
//     try {
//       console.log("Resending OTP for email:", email);
      
//       const res = await axios.post(`${API_BASE_URL}/send-otp`, { email });
      
//       console.log("Resend OTP response:", res.data);
      
//       if (res.data.success) {
//         Alert.alert("OTP Sent", "A new OTP has been sent to your email.");
//       } else {
//         Alert.alert("Error", res.data.message || "Failed to resend OTP");
//       }
//     } catch (error) {
//       console.error("Resend OTP Error:", error.message);
//       if (error.response?.data?.message) {
//         Alert.alert("Error", error.response.data.message);
//       } else {
//         Alert.alert("Error", "Could not resend OTP. Please try again.");
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Enter OTP</Text>
//       <Text style={styles.subtitle}>
//         We've sent a 6-digit verification code to {email}
//       </Text>
      
//       <TextInput
//         style={styles.input}
//         placeholder="6-digit OTP"
//         placeholderTextColor="#9A8478"
//         keyboardType="number-pad"
//         value={otpInput}
//         onChangeText={setOtpInput}
//         maxLength={6}
//       />
      
//       <TouchableOpacity style={styles.button} onPress={verifyOTP}>
//         <Text style={styles.buttonText}>Verify OTP</Text>
//       </TouchableOpacity>

//       <View style={styles.resendContainer}>
//         <Text style={styles.resendText}>Didn't receive the code?</Text>
//         <TouchableOpacity onPress={resendOTP}>
//           <Text style={styles.resendLink}>Resend OTP</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
//         <Text style={styles.backButtonText}>Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
//   title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10, color: "#333" },
//   subtitle: { fontSize: 16, textAlign: "center", marginBottom: 30, color: "#666", lineHeight: 22 },
//   input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 15, fontSize: 18, textAlign: "center", marginBottom: 20, letterSpacing: 5 },
//   button: { backgroundColor: "#004aad", padding: 15, borderRadius: 8, alignItems: "center", marginBottom: 20 },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
//   resendContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 20 },
//   resendText: { fontSize: 14, color: "#555" },
//   resendLink: { fontSize: 14, fontWeight: "bold", color: "#004aad", marginLeft: 5 },
//   backButton: { alignItems: "center", padding: 10 },
//   backButtonText: { fontSize: 16, color: "#004aad" },
// });

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://172.20.10.3:3000";

export default function OTP() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const name = Array.isArray(params.name) ? params.name[0] : params.name;
  const email = Array.isArray(params.email) ? params.email[0] : params.email;
  const mobile = Array.isArray(params.mobile) ? params.mobile[0] : params.mobile;
  const password = Array.isArray(params.password) ? params.password[0] : params.password;
  
  const [otpInput, setOtpInput] = useState("");

  const verifyOTP = async () => {
    if (otpInput.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit OTP");
      return;
    }

    console.log("Parameters before verification:", {
      name,
      email,
      mobile,
      password: password ? "***" : "missing"
    });

    try {
      console.log("Sending OTP verification request:", { email, otp: otpInput });
      
      const res = await axios.post(`${API_BASE_URL}/verify-otp`, { 
        email, 
        otp: otpInput 
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("OTP verification response:", res.data);

      if (res.data.success) {
        if (!name || !email || !mobile || !password) {
          console.error("Missing required fields:", { name: !!name, email: !!email, mobile: !!mobile, password: !!password });
          Alert.alert("Error", "Missing required information. Please go back and try again.");
          return;
        }

        console.log("Creating user with data:", { name, email, mobile, password: "***" });
        
        const createUserRes = await axios.post(`${API_BASE_URL}/register`, {
          name: name.toString(),
          email: email.toString(),
          mobile: mobile.toString(),
          password: password.toString()
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log("User creation response:", createUserRes.data);

        if (createUserRes.data.success) {
          Alert.alert("Success", "Account created successfully!", [
            { text: "OK", onPress: () => router.push("/sign_in") },
          ]);
        } else {
          Alert.alert("Error", createUserRes.data.message || "Failed to create account");
        }
      } else {
        Alert.alert("Error", res.data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("OTP Verification Error Details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        requestData: { email, otp: otpInput }
      });
      
      if (error.response?.data?.message) {
        Alert.alert("Error", error.response.data.message);
      } else {
        Alert.alert("Error", "Could not verify OTP. Please try again.");
      }
    }
  };

  const resendOTP = async () => {
    try {
      console.log("Resending OTP for email:", email);
      
      const res = await axios.post(`${API_BASE_URL}/send-otp`, { email });
      
      console.log("Resend OTP response:", res.data);
      
      if (res.data.success) {
        Alert.alert("OTP Sent", "A new OTP has been sent to your email.");
      } else {
        Alert.alert("Error", res.data.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP Error:", error.message);
      if (error.response?.data?.message) {
        Alert.alert("Error", error.response.data.message);
      } else {
        Alert.alert("Error", "Could not resend OTP. Please try again.");
      }
    }
  };

  // Debug: Show current parameter values
  React.useEffect(() => {
    console.log("OTP Screen - Received parameters:", {
      name: name || "MISSING",
      email: email || "MISSING", 
      mobile: mobile || "MISSING",
      password: password ? "PRESENT" : "MISSING"
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>
        We've sent a 6-digit verification code to {email || "your email"}
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="6-digit OTP"
        placeholderTextColor="#9A8478"
        keyboardType="number-pad"
        value={otpInput}
        onChangeText={setOtpInput}
        maxLength={6}
      />
      
      <TouchableOpacity style={styles.button} onPress={verifyOTP}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive the code?</Text>
        <TouchableOpacity onPress={resendOTP}>
          <Text style={styles.resendLink}>Resend OTP</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10, color: "#333" },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 30, color: "#666", lineHeight: 22 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 15, fontSize: 18, textAlign: "center", marginBottom: 20, letterSpacing: 5 },
  button: { backgroundColor: "#4FC3F7", padding: 15, borderRadius: 8, alignItems: "center", marginBottom: 20 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  resendContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 20 },
  resendText: { fontSize: 14, color: "#555" },
  resendLink: { fontSize: 14, fontWeight: "bold", color: "#4FC3F7", marginLeft: 5 },
  backButton: { alignItems: "center", padding: 10 },
  backButtonText: { fontSize: 16, color: "#4FC3F7" },
});