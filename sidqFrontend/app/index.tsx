import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Base width for scaling (e.g., iPhone 12 Pro = 393px width)
const scaleFactor = screenWidth / 393;

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/sidqLogo.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.text}>
        The one stop shop for{"\n"} your
        <Text style={styles.sadqaText}> sadqa</Text> needs
      </Text>

      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />

      <Link href="/onboarding/OnboardingScreen" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.getStarted}>GET STARTED</Text>
        </TouchableOpacity>
      </Link>
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
    width: screenWidth * 0.7256,
    height: screenHeight * 0.3122,
    resizeMode: "cover",
    position: "absolute",
    bottom: screenHeight * 0.4,
    left: (screenWidth - screenWidth * 0.7256) / 2,
  },
  text: {
    fontFamily: "Inter",
    fontSize: 27.93 * scaleFactor,
    fontWeight: "800",
    textAlign: "center",
    position: "absolute",
    bottom: screenHeight * 0.3,
  },
  sadqaText: {
    color: "#31693E",
  },
  circleOne: {
    width: 15 * scaleFactor,
    height: 15 * scaleFactor,
    borderRadius: 7.5 * scaleFactor,
    backgroundColor: "#31693E",
    position: "absolute",
    left: "45%",
    bottom: screenHeight * 0.05,
  },
  circleTwo: {
    width: 15 * scaleFactor,
    height: 15 * scaleFactor,
    borderRadius: 7.5 * scaleFactor,
    backgroundColor: "#D9D9D9",
    position: "absolute",
    right: "45%",
    bottom: screenHeight * 0.05,
  },
  button: {
    width: 313 * scaleFactor,
    height: 64 * scaleFactor,
    backgroundColor: "#31693E",
    borderRadius: 32 * scaleFactor,
    position: "absolute",
    bottom: screenHeight * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  getStarted: {
    fontFamily: "Inter",
    fontWeight: "800",
    fontSize: 25 * scaleFactor,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
