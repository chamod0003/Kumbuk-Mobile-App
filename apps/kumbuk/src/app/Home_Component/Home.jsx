import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth } from "../../../firebaseConfig"; 

export default function Home() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      setUserName(user.displayName || "User");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome {userName}!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, fontWeight: "bold", color: "#004aad" },
});
