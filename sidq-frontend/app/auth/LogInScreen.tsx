import {
  View,
  Image,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { loginUser } from "../services/api";
// import GoogleSignInButton from "./GoogleSignInButton";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import * as AuthSession from "expo-auth-session";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const scaleFactor = screenWidth / 393;

export default function LogInScreen() {
  // const redirectUri = AuthSession.makeRedirectUri({
  //   useProxy: true,
  // });
  //
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   clientId:
  //     "165374973540-fevinpcp24ec316erocbregddq86smsv.apps.googleusercontent.com",
  //   redirectUri,
  // });
  //

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, password);
      console.log("User has logged in!");

      if (user.type === "user") {
        router.push("/dashboard/user/DashboardHome");
      } else {
        router.push("/dashboard/org/DashboardHome");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSignUpSelect = (role: "user" | "organization") => {
    setModalVisible(false);

    if (role === "user") {
      router.push("/auth/SignUpScreenUser");
    } else {
      router.push("/auth/SignUpScreenOrg");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={{ backgroundColor: "white", flex: 1 }}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require("@/assets/images/sidqLogo.png")}
            style={styles.image}
          />

          <Text style={styles.welcomeBack}>Welcome Back</Text>

          {/* Google sign-in */}
          {/* <GoogleSignInButton */}
          {/*   onPress={() => promptAsync()} */}
          {/*   disabled={!request} */}
          {/*   style={styles.googleSignIn} */}
          {/* /> */}

          <View style={styles.manualSignIn}>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <TouchableOpacity style={styles.logInButton} onPress={handleLogin}>
              <Text style={styles.logInText}>Log in</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signUpRedirect}>
            <Text style={styles.dontHaveAccountText}>
              Don&apos;t have an account?
            </Text>

            <TouchableOpacity>
              <Text
                onPress={() => setModalVisible(true)}
                style={styles.signUpButtonText}
              >
                Sign Up
              </Text>
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
                    onPress={() => handleSignUpSelect("user")}
                  >
                    <Image
                      source={require("@/assets/images/user-image.png")}
                      style={styles.userImage}
                    />
                    <Text style={styles.userButtonText}>User</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleSignUpSelect("organization")}
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
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  modalBox: {
    width: 300,
    height: 300,
    backgroundColor: "white",
    paddingVertical: 40,
    paddingHorizontal: 50,
    borderRadius: 12,
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
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
  userImage: {
    width: 40,
    height: 40,
    color: "#184D36",
    marginRight: 10, // space between icon and text
  },
  userButtonText: {
    fontWeight: "800",
    color: "#31693E",
    fontSize: 20,
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
  closeText: {
    fontWeight: "600",
    fontSize: 20,
    marginTop: 20,
  },
  signUpButtonText: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: 600,
    textDecorationLine: "underline",
    paddingTop: 10,
  },
  dontHaveAccountText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: 400,
  },
  signUpRedirect: {
    paddingTop: 15,
    alignItems: "center",
  },
  logInButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#31693E",
    width: "80%",
    height: 56 * scaleFactor,
    borderRadius: 28 * scaleFactor,
    marginTop: 20,
  },
  logInText: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 25 * scaleFactor,
    color: "white",
  },
  container: {
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: screenHeight * 0.065,
    paddingBottom: screenHeight * 0.12,
    paddingHorizontal: 20,
  },
  image: {
    width: 100 * scaleFactor,
    height: 85 * scaleFactor,
    resizeMode: "contain",
    marginBottom: 20,
  },
  input: {
    height: 48 * scaleFactor,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16 * scaleFactor,
  },
  welcomeBack: {
    fontSize: 32 * scaleFactor,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "Inter",
    marginBottom: 15,
  },
  googleSignIn: {
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 40,
  },
  manualSignIn: {
    width: "100%",
    gap: 10,
    marginTop: 12,
  },
});
