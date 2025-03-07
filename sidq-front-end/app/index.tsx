import { Image, Text, View, StyleSheet } from "react-native";
import React from "react";

export default function Index() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/sidqLogo.png")}
        style={styles.image}
      />

      <Text style={styles.text}>The one stop shop for your sadqa needs</Text>
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
    width: 300, // Set the width of the image
    height: 300, // Set the height of the image
    resizeMode: "cover", // Ensure the image covers the container
    position: "absolute",
    top: 150,
    shadowColor: "black", // Shadow color (iOS only)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 3, // Shadow blur radius
    alignSelf: "center", // Center the image horizontally
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});
