import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";

export default function GoogleSignInButton({
  onPress,
  disabled,
  style,
}: {
  onPress: () => void;
  disabled: boolean;
  style?: object;
}) {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabled]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={styles.contentWrapper}>
        <Image
          source={require("@/assets/images/google-icon.png")}
          style={styles.icon}
        />

        <Text style={styles.text}>Continue with Google</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    borderColor: "#747775",
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    paddingHorizontal: 50,
    maxWidth: 400,
    justifyContent: "center",
    alignSelf: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 25,
    width: 25,
    marginRight: 12,
  },
  text: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "595",
    color: "#1f1f1f",
  },
});
