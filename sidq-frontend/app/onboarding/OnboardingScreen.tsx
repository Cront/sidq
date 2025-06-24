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
      router.push("/auth/SignUpScreenUser");
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
            <Text style={styles.continueAs}>Continue as:</Text>
            <Text style={styles.chooseYourAccount}>
              Which type of account would you like to create
            </Text>

            <TouchableOpacity
              style={styles.userButton}
              onPress={() => handleSelect("user")}
            >
              <Image
                source={require("@/assets/images/user-image.png")}
                style={styles.userImage}
              />
              <Text style={styles.userButtonText}>User</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSelect("organization")}
              style={styles.organizationButton}
            >
              <Image
                source={require("@/assets/images/organization-logo.png")}
                style={styles.userImage}
              />
              <Text style={styles.userButtonText}>Organization</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Link href="/auth/LogInScreen" asChild>
        <TouchableOpacity style={styles.logInButton}>
          <Text style={styles.logInText}>Log in</Text>
        </TouchableOpacity>
      </Link>

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
  closeText: {
    fontWeight: "600",
    fontSize: 20,
    marginTop: 20,
  },
  modalBox: {
    width: 300,
    height: 300,
    backgroundColor: "white",
    paddingVertical: 40,
    paddingHorizontal: 50,
    borderRadius: 12,
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    color: "#184D36",
    marginRight: 10, // space between icon and text
  },
  userButton: {
    flexDirection: "row", // icon and text side by side
    alignItems: "center", // vertically center
    justifyContent: "flex-start", // align content to the left
    paddingVertical: 5, // top & bottom padding
    paddingHorizontal: 15, // left & right padding
    borderWidth: 1, // outlined border
    borderColor: "#184D36", // dark green
    borderRadius: 12, // rounded corners
    marginTop: 70,
    width: "125%",
  },
  organizationButton: {
    flexDirection: "row", // icon and text side by side
    alignItems: "center", // vertically center
    justifyContent: "flex-start", // align content to the left
    paddingVertical: 5, // top & bottom padding
    paddingHorizontal: 15, // left & right padding
    borderWidth: 1, // outlined border
    borderColor: "#184D36", // dark green
    borderRadius: 12, // rounded corners
    marginTop: 10,
    width: "125%",
  },
  userButtonText: {
    fontWeight: "800",
    color: "#31693E",
    fontSize: 20,
  },
  continueAs: {
    fontFamily: "Inter",
    fontSize: 25 * scaleFactor,
    fontWeight: 800,
    textAlign: "center",
    position: "absolute",
    marginTop: 20,
  },
  chooseYourAccount: {
    fontFamily: "Inter",
    fontSize: 15 * scaleFactor,
    fontWeight: 400,
    textAlign: "center",
    position: "absolute",
    marginTop: 55,
  },
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
  logInButton: {
    position: "absolute",
    bottom: screenHeight * 0.115,
  },
  logInText: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 20 * scaleFactor,
    textDecorationLine: "underline",
  },
});
