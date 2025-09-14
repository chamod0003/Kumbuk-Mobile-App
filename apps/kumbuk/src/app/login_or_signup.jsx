import { Image } from "expo-image";
import { Text, View, Pressable, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Login_or_signup() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#fffefeff" }}>
      <Pressable>
        <View>
          {/* Background Image */}
          <Image
            source={require("../../assets/images/Group9.png")}
            style={{
              width: 650.04,
              height: 700.31,
              top: -60,
              left: -145,
              position: "absolute",
            }}
          />

          {/* Main Title */}
          <View style={{ alignItems: "center", marginTop: 500 }}>
            <Text style={styles.title}>
              One App. Every{" "}
              <Text style={{ color: "#4FC3F7" }}>Service</Text>
            </Text>
            <Text style={styles.title}>As You Wish...</Text>
          </View>

          {/* Subtitle */}
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={styles.subtitle}>
              Experience the best services tailored for you.
            </Text>
          </View>

          {/* Buttons */}
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => router.push("/sign_in")}
            >
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => router.push("/sign_up")}
            >
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#A6A6A6",
    textAlign: "center",
  },
  signInButton: {
    backgroundColor: "#4FC3F7",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 15,
  },
  signInText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  signUpButton: {
    borderWidth: 2,
    borderColor: "#4FC3F7",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  signUpText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4FC3F7",
  },
});
