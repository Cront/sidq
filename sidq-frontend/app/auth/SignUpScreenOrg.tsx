import {
  Image,
  Text,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";

import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import GoogleSignInButton from "./GoogleSignInButton";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const scaleFactor = screenWidth / 393;

// finishes any previous login session if the user left the app and returned
WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreenOrg() {
  const handleSignUp = async () => {
    // check all fields are present
    if (
      organizationName === "" ||
      organizationEmail === "" ||
      organizationPassword === "" ||
      organizationConfirmPassword === ""
    ) {
      alert("All fields are required to set up account");
      return;
    }

    // check proper email structure
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(organizationEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    // check passwords match
    if (organizationPassword !== organizationConfirmPassword) {
      alert("Passwords do not match. Please try again");
      return;
    }

    // check password length
    if (organizationPassword.length < 8) {
      alert(
        "Passord length too short. Please make password at least eight characters.",
      );
      return;
    }

    // check one uppercase and one lowercase
    if (
      !/[A-Z]/.test(organizationPassword) ||
      !/[a-z]/.test(organizationPassword)
    ) {
      alert("Password must have one lowercase and one uppercase character");
      return;
    }

    const url = "http://127.0.0.1:5000/organization/create_org_account";
    const data = {
      name: organizationName,
      email: organizationEmail,
      password: organizationPassword,
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

      // TODO: network error here
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server Error: ", errorData);
        alert("Error: " + errorData.message);
        return;
      }

      const result = await response.json();
      console.log("Success", result);
      alert("Organization account succesfully created!");
    } catch (error) {
      console.error("Network error:", error);
      alert("Error: " + error);
    }
  };
  const [organizationName, setOrganizationName] = useState("");
  const [organizationEmail, setOrganizationEmail] = useState("");
  const [organizationPassword, setOrganizationPassword] = useState("");
  const [organizationConfirmPassword, setOrganizationConfirmPassword] =
    useState("");

  // TODO: fix 'Continue with Google' credentials issue (probably need to make Apple dev and Android dev account and connect to API)
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  });

  // console.log("Generated redirectUri:", redirectUri);

  // request: contains the config for the auth session
  // promptAsync: opens a browser / in-app browser
  // response: holds the result after the user signs in or cancels
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "165374973540-fevinpcp24ec316erocbregddq86smsv.apps.googleusercontent.com",
    redirectUri,
  });

  //
  useEffect(() => {
    if (response) {
      console.log("Response: ", JSON.stringify(response, null, 2));
    }

    if (response?.type === "success") {
      const { authentication } = response;
      console.log("✅ Access Token:", authentication?.accessToken);
    }
  }, [response]);

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
          {/* Logo */}
          <Image
            source={require("@/assets/images/sidqLogo.png")}
            style={styles.image}
          />

          {/* Header */}
          <Text style={styles.header}>Create Organization Account</Text>

          {/* Google Sign In */}
          <GoogleSignInButton
            onPress={() => promptAsync()}
            disabled={!request}
            style={styles.googleSignIn}
          />

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.signUpManuallyText}>or sign up manually</Text>
            <View style={styles.line} />
          </View>

          {/* Manual Sign In */}
          <View style={styles.manualSignIn}>
            <TextInput
              style={styles.input}
              placeholder="Organization Name"
              value={organizationName}
              onChangeText={setOrganizationName}
            />

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={organizationEmail}
              onChangeText={setOrganizationEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={organizationPassword}
              onChangeText={setOrganizationPassword}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              value={organizationConfirmPassword}
              onChangeText={setOrganizationConfirmPassword}
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
    paddingTop: screenHeight * 0.065,
    paddingBottom: screenHeight * 0.12,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "white",
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
  image: {
    width: 100 * scaleFactor,
    height: 85 * scaleFactor,
    resizeMode: "contain",
    marginBottom: 20,
  },
  header: {
    fontSize: 28 * scaleFactor,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "Inter",
    marginBottom: 24,
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
