import {
  Image,
  Text,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
} from "react-native";

import React, { useState } from "react";
import { Link } from "expo-router";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const scaleFactor = screenWidth / 393;

export default function SignUpScreen() {
  const [organizationName, setOrganizationName] = useState("");

  return (
    <View style={styles.container}>
      {/* Sidq logo */}
      <Image
        source={require("@/assets/images/sidqLogo.png")}
        style={styles.image}
      />

      {/* Create Account Header */}
      <Text style={styles.header}>Create Your Organization's Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Organization Name"
        value={organizationName}
        onChangeText={setOrganizationName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150 * scaleFactor,
    height: 125 * scaleFactor,
    resizeMode: "cover",
    position: "absolute",
    top: screenHeight * 0.08,
    left: screenWidth / 2 - (150 * scaleFactor) / 2,
  },
  header: {
    fontSize: 32 * scaleFactor,
    fontWeight: 800,
    textAlign: "center",
    position: "absolute",
    top: screenHeight * 0.3,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
