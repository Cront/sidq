import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Keyboard,
  Dimensions,
  Image,
  Text,
  TextInput,
  View,
} from "react-native";
import GoogleSignInButton from "./GoogleSignInButton";
import { Link } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const scaleFactor = screenWidth / 393;

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreenUser() {
  const handleSignUp = async () => {
    if (
      userFirstName === "" ||
      userLastName === "" ||
      userEmail === "" ||
      userPassword === "" ||
      userConfirmPassword === ""
    ) {
      alert("All fields required to create account.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (userPassword !== userConfirmPassword) {
      alert("Password's do not match.");
      return;
    }

    if (userPassword.length < 8) {
      alert("Password length is too short. It must be 8 characters at least.");
      return;
    }

    if (!/[A-Z]/.test(userPassword) || !/[a-z]/.test(userPassword)) {
      alert("One lowercase letter and one uppercase letter required.");
      return;
    }

    const url = "http://127.0.0.1:5000/user/create_user_account";
    const data = {
      first_name: userFirstName,
      middle_name: userMiddleName,
      last_name: userLastName,
      email: userEmail,
      password: userPassword,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errData = await response.json();
        console.error("Server error: ", errData);
        alert("Server error: " + errData);

        return;
      }

      const result = await response.json();
      console.log("Success: ", result);
      alert("User account successfully created!");
    } catch (error) {
      console.error("Network error: ", error);
      alert("Error: " + error);
    }
  };

  const [userFirstName, setUserFirstName] = useState("");
  const [userMiddleName, setUserMiddleName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // TODO: set up view password functionality

  // TODO: fix 'Continue with Google' credentials issue (probably need to make Apple dev and Android dev account and connect to API)

  // const redirectUri = AuthSession.makeRedirectUri({
  //   useProxy: true,
  // });

  // console.log("Generated redirectUri:", redirectUri);

  // request: contains the config for the auth session
  // promptAsync: opens a browser / in-app browser
  // response: holds the result after the user signs in or cancels
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   clientId:
  //     "165374973540-fevinpcp24ec316erocbregddq86smsv.apps.googleusercontent.com",
  //   redirectUri,
  // });

  //
  // useEffect(() => {
  //   if (response) {
  //     console.log("Response: ", JSON.stringify(response, null, 2));
  //   }
  //
  //   if (response?.type === "success") {
  //     const { authentication } = response;
  //     console.log("✅ Access Token:", authentication?.accessToken);
  //   }
  // }, [response]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={{ backgroundColor: "white", flex: 1 }}
          contentContainerStyle={styles.container}
        >
          <Image
            source={require("@/assets/images/sidqLogo.png")}
            style={styles.image}
          />

          {/* Header */}
          <Text style={styles.header}>Create User Account</Text>

          {/* Google Sign In */}
          {/* <GoogleSignInButton */}
          {/*   onPress={() => promptAsync()} */}
          {/*   disabled={!request} */}
          {/*   style={styles.googleSignIn} */}
          {/* /> */}

          {/* Divider */}
          {/* <View style={styles.dividerContainer}> */}
          {/*   <View style={styles.line} /> */}
          {/*   <Text style={styles.signUpManuallyText}>or sign up manually</Text> */}
          {/*   <View style={styles.line} /> */}
          {/* </View> */}

          {/* Manual Sign In */}
          <View style={styles.manualSignIn}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={userFirstName}
              onChangeText={setUserFirstName}
            />

            <TextInput
              style={styles.input}
              placeholder="Middle Name (Optional)"
              value={userMiddleName}
              onChangeText={setUserMiddleName}
            />

            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={userLastName}
              onChangeText={setUserLastName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={userEmail}
              onChangeText={setUserEmail}
            />

            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Password"
              value={userPassword}
              onChangeText={setUserPassword}
            />

            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Confirm password"
              value={userConfirmPassword}
              onChangeText={setUserConfirmPassword}
            />

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSignUp}
            >
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginRedirect}>
            <Text style={styles.alreadyHaveAccnt}>
              Already have an account?
            </Text>

            <Link href="/auth/LogInScreen" asChild>
              <TouchableOpacity style={styles.logInButton}>
                <Text style={styles.logInButtonText}>Log In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: screenHeight * 0.025,
    paddingBottom: screenHeight * 0.12,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: 100 * scaleFactor,
    height: 85 * scaleFactor,
    resizeMode: "contain",
    marginTop: 55 * scaleFactor,
  },
  loginRedirect: {
    paddingTop: 15,
    alignItems: "center",
  },
  logInButton: {},
  logInButtonText: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: 600,
    textDecorationLine: "underline",
    paddingTop: 10,
  },
  alreadyHaveAccnt: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: 400,
  },
  header: {
    fontSize: 28 * scaleFactor,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "Inter",
    marginBottom: 15,
  },
  googleSignIn: {
    borderWidth: 1,
    borderRadius: 100,
    height: 40 * scaleFactor,
    paddingHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
    width: "80%",
  },
  signUpManuallyText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#888",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  manualSignIn: {
    width: "100%",
    gap: 10,
    marginTop: 12,
  },
  input: {
    height: 48 * scaleFactor,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16 * scaleFactor,
    backgroundColor: "#fff",
  },
  signUpButton: {
    width: "80%",
    height: 56 * scaleFactor,
    backgroundColor: "#31693E",
    borderRadius: 28 * scaleFactor,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  signUpText: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 25 * scaleFactor,
    color: "white",
  },
});
