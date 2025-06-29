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
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import GoogleSignInButton from "./GoogleSignInButton";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";

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
  const [logInInfo, setLogInInfo] = useState("");
  const [logInPassword, setLogInPassword] = useState("");

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
              placeholder="Email Address or Phone Number"
              value={logInInfo}
              onChangeText={setLogInInfo}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={logInPassword}
              onChangeText={setLogInPassword}
              secureTextEntry={true}
            />

            <TouchableOpacity style={styles.logInButton}>
              <Text style={styles.logInText}>Log in</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signUpRedirect}>
            <Text style={styles.dontHaveAccountText}>
              Don&apos;t have an account?
            </Text>

            <Link href="/" asChild>
              <TouchableOpacity>
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
