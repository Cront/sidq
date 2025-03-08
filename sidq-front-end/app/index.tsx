import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

export default function Index() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/sidqLogo.png")}
        style={styles.image}
      />

      <Text style={styles.text}>
        The one stop shop for{"\n"} your{" "}
        <Text style={styles.sadqaText}>sadqa</Text> needs
      </Text>

      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />

      <TouchableOpacity style={styles.button}>
        {" "}
        <Text style={styles.getStarted}>GET STARTED</Text>{" "}
      </TouchableOpacity>
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
    width: 312, // Set the width of the image
    height: 291, // Set the height of the image
    resizeMode: "cover", // Ensure the image covers the container
    position: "absolute",
    top: height * 0.18,
    left: (width - 312) / 2,
  },
  text: {
    fontFamily: "Inter",
    fontSize: 27.93,
    fontWeight: "800",
    textAlign: "center",
    position: "absolute",
    bottom: height * 0.3,
  },
  sadqaText: {
    color: "#31693E",
  },
  circleOne: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "#31693E", // Add a background color
    position: "absolute", // Ensure it's placed properly
    left: "45%",
    bottom: height * 0.05,
  },
  circleTwo: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: "#D9D9D9",
    position: "absolute",
    bottom: height * 0.05,
    right: "45%",
  },
  button: {
    width: 313,
    height: 64,
    backgroundColor: "#31693E",
    borderRadius: 32,
    position: "absolute",
    bottom: height * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  getStarted: {
    fontFamily: "Inter",
    fontWeight: 800,
    fontSize: 25,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
