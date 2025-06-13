import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  Platform,
  Keyboard,
  Dimensions,
  Image,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const scaleFactor = screenWidth / 393;

export default function SignUpScreenUser() {
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: 100 * scaleFactor,
    height: 85 * scaleFactor,
    resizeMode: "contain",
    marginTop: 55 * scaleFactor,
  },
});
