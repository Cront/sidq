import {
  Image,
  Text,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Button,
} from "react-native";

import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import GoogleSignInButton from "./GoogleSignInButton";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const scaleFactor = screenWidth / 393;

// finishes any previous login session if the user left the app and returned
WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const [organizationName, setOrganizationName] = useState("");

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "sidq",
    useProxy: false,
  });

  // console.log("Generated redirectUri:", redirectUri);

  // request: contains the config for the auth session
  // promptAsync: opens a browser / in-app browser
  // response: holds the result after the user signs in or cancels
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "165374973540-fevinpcp24ec316erocbregddq86smsv.apps.googleusercontent.com",
    redirectUri,
    useProxy: false,
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
    <View style={styles.container}>
      {/* Sidq logo */}
      <Image
        source={require("@/assets/images/sidqLogo.png")}
        style={styles.image}
      />

      {/* Create Account Header */}
      <Text style={styles.header}>Create Organization Account</Text>

      <GoogleSignInButton
        onPress={() => promptAsync()}
        disabled={!request} // disable button if request not ready
        style={styles.googleSignIn}
      />

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.signUpManuallyText}>or sign up manually</Text>
        <View style={styles.line} />
      </View>

      {/* <TextInput */}
      {/*   style={styles.organizationNameInput} */}
      {/*   placeholder="Organization Name" */}
      {/*   value={organizationName} */}
      {/*   onChangeText={setOrganizationName} */}
      {/* /> */}
      {/**/}
      {/* <TextInput */}
      {/*   style={styles.input} */}
      {/*   placeholder="Organization Name" */}
      {/*   value={organizationName} */}
      {/*   onChangeText={setOrganizationName} */}
      {/* /> */}
      {/**/}
      {/* <TextInput */}
      {/*   style={styles.input} */}
      {/*   placeholder="Organization Name" */}
      {/*   value={organizationName} */}
      {/*   onChangeText={setOrganizationName} */}
      {/* /> */}
      {/**/}
      {/* <TextInput */}
      {/*   style={styles.input} */}
      {/*   placeholder="Organization Name" */}
      {/*   value={organizationName} */}
      {/*   onChangeText={setOrganizationName} */}
      {/* /> */}
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
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20 * scaleFactor,
    top: screenHeight * -0.11,
    width: "80%",
  },
  googleSignIn: {
    top: screenHeight * -0.1,
    borderWidth: 1 * scaleFactor,
    borderRadius: 100,
    height: 40 * scaleFactor,
    paddingHorizontal: 50 * scaleFactor,
    maxWidth: 400 * scaleFactor,
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
  image: {
    width: 100 * scaleFactor,
    height: 85 * scaleFactor,
    resizeMode: "cover",
    position: "absolute",
    top: screenHeight * 0.08,
    left: screenWidth / 2 - (100 * scaleFactor) / 2,
  },
  header: {
    fontSize: 32 * scaleFactor,
    fontWeight: 800,
    textAlign: "center",
    position: "absolute",
    top: screenHeight * 0.22,
    fontFamily: "Inter",
  },
  organizationNameInput: {
    top: screenHeight * -0.05,
    height: 55 * scaleFactor,
    borderColor: "#ccc",
    borderWidth: 1 * scaleFactor,
    borderRadius: 5 * scaleFactor,
    paddingHorizontal: 175 * scaleFactor,
    fontSize: 20 * scaleFactor,
    paddingLeft: 10 * scaleFactor,
  },
});
