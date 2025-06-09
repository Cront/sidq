import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link, useRouter } from "expo-router";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Base width for scaling (example: iPhone 14 Pro = 430px)
const scaleFactor = screenWidth / 430;

export default function OnboardingScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (role: "user" | "organization") => {
    setModalVisible(false);
    const router = useRouter();

    if (role === "user") {
      // router.push('')
    } else {
      router.push("/auth/SignUpScreenOrg");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/sidqLogo.png")}
        style={styles.sidqLogo}
      />

      <MaskedView
        maskElement={
          <Text style={[styles.text, { backgroundColor: "transparent" }]}>
            Giving{"\n"}Tracking{"\n"}Automating{"\n"}Learning{"\n"}Growing
          </Text>
        }
      >
        <LinearGradient
          colors={["#316952", "#39D386", "#8CE8B2"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <Text style={[styles.text, { opacity: 0 }]}>
            Giving{"\n"}Tracking{"\n"}Automating{"\n"}Learning{"\n"}Growing
          </Text>
        </LinearGradient>
      </MaskedView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Continue as:</Text>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.proceedAsGuestButton}>
        <Text style={styles.proceedAsGuestText}>Proceed as guest</Text>
      </TouchableOpacity>

      <View style={styles.circleOne} />
      <View style={styles.circleTwo} />
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  modalText: {},
  sidqLogo: {
    width: 90 * scaleFactor,
    height: 85 * scaleFactor,
    resizeMode: "cover",
    position: "absolute",
    top: screenHeight * 0.065,
    left: (screenWidth - 90) / 2,
  },
  text: {
    fontFamily: "Inter",
    fontSize: 52 * scaleFactor,
    fontWeight: "800",
    textAlign: "center",
  },
  circleOne: {
    width: 15 * scaleFactor,
    height: 15 * scaleFactor,
    borderRadius: 7.5 * scaleFactor,
    backgroundColor: "#D9D9D9",
    position: "absolute",
    left: "45%",
    bottom: screenHeight * 0.05,
  },
  circleTwo: {
    width: 15 * scaleFactor,
    height: 15 * scaleFactor,
    borderRadius: 7.5 * scaleFactor,
    backgroundColor: "#31693E",
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
    bottom: screenHeight * 0.15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Inter",
    fontWeight: "800",
    fontSize: 25 * scaleFactor,
    color: "#FFFFFF",
    textAlign: "center",
  },
  proceedAsGuestButton: {
    position: "absolute",
    bottom: screenHeight * 0.115,
  },
  proceedAsGuestText: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 20 * scaleFactor,
    textDecorationLine: "underline",
  },
});
