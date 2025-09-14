import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,Alert,StyleSheet,Image,} from "react-native";
import { useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const API_BASE_URL = "http://172.20.10.3:3000";

  const onSignUpPress = async () => {
    if (!name?.trim() || !email?.trim() || !mobile?.trim() || !password?.trim()) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/send-otp`, { 
        email: email.trim() 
      });
      
      if (res.data.success) {
        Alert.alert("OTP Sent", "Please check your email.");
        
        console.log("Navigating to OTP with params:", {
          name: name.trim(),
          email: email.trim(),
          mobile: mobile.trim(),
          password: "***"
        });
  
        router.push({
          pathname: "/otp",
          params: { 
            name: name.trim(),
            email: email.trim(), 
            mobile: mobile.trim(),
            password: password.trim()
          },
        });
      } else {
        Alert.alert("Error", res.data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Send OTP Error:", error.message);
      if (error.response?.data?.message) {
        Alert.alert("Error", error.response.data.message);
      } else {
        Alert.alert("Error", "Could not send OTP. Please try again.");
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      extraScrollHeight={30}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/Group11.png")}
          style={styles.illustration}
        />
        <Text style={styles.title}>Create Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#9A8478"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9A8478"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#9A8478"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={setMobile}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9A8478"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#9A8478"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/sign_in")}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20 ,backgroundColor: "#fff"},
  illustration: { width: 550, height: 450, resizeMode: "contain",marginBottom: -150, left: -55,marginTop: -50 },
  title: { fontSize: 24, fontWeight: "bold", marginVertical: 20 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#4FC3F7",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  footerContainer: { flexDirection: "row", marginTop: 20 },
  footerText: { fontSize: 14, color: "#555" },
  linkText: { fontSize: 14, fontWeight: "bold", color: "#4FC3F7", marginLeft: 5 },
});