import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login_or_signup"); // Go to sign_in after 2s
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/image2.png")}
        style={styles.image}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0141A2",
  },
  image: {
     width: 650.04,
              height: 700.31,
              
              position: "fixed"
             
  },
});
