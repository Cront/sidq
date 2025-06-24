import {
  View,
  Image,
  Text,
  Dimensions,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
} from "react-native";
import GoogleSignInButton from "./GoogleSignInButton";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const scaleFactor = screenWidth / 393;

export default function LogInScreen() {
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "165374973540-fevinpcp24ec316erocbregddq86smsv.apps.googleusercontent.com",
    redirectUri,
  });

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
          <GoogleSignInButton
            onPress={() => promptAsync()}
            disabled={!request}
            style={styles.googleSignIn}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: screenHeight * 0.065,
    paddingBottom: screenHeight * 0.12,
  },
  image: {
    width: 100 * scaleFactor,
    height: 85 * scaleFactor,
    resizeMode: "contain",
    marginBottom: 20,
  },
  welcomeBack: {
    fontSize: 32 * scaleFactor,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "Inter",
    marginBottom: 24,
  },
  googleSignIn: {
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 40,
  },
});
