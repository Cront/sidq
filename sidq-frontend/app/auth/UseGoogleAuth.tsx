import * as WebBroswer from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";

WebBroswer.maybeCompleteAuthSession();

export function UseGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "",
    iosClientId: "",
    androidClientId: "",
    webClientId: "",
    redirectUri: "",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Access token:", authentication?.accessToken);
    }
  }, [response]);

  return {
    signIn: () => promptAsync(), // trigger login when user presses button
    isAvailable: !!request, // indicates whether the login flow is ready
  };
}
