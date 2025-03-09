import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

const { width, height } = Dimensions.get("window");

export default function onboarding2() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/sidqLogo.png")}
        style={styles.sidqLogo}
        resizeMode="contain"
      />

      <Image
        source={require("@/assets/images/givingTrackingAutomatingLearningGrowing.png")}
        style={styles.textImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  sidqLogo: {
    width: 90,
    height: 85,
    resizeMode: "cover",
    position: "absolute",
    top: height * 0.03,
    left: (width - 90) / 2,
  },
  textImage: {
    width: 300,
    height: 300,
    resizeMode: "cover",
  },
  text: {
    fontFamily: "Inter",
    fontSize: 52,
    fontWeight: "800",
  },
  gradient: {
    width: "100%",
    height: 50, // Height should cover the text
  },
});
