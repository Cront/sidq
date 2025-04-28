import { Image, Text, StyleSheet, View, Dimensions } from "react-native";

import React from "react";
import { Link } from "expo-router";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const scaleFactor = screenWidth / 430;

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/sidqLogo.png")}
        style={styles.image}
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
    width: 90 * scaleFactor,
    height: 85 * scaleFactor,
    resizeMode: "cover",
    position: "absolute",
    top: screenHeight * 0.065,
    left: (screenWidth - 90) / 2,
  },
});
