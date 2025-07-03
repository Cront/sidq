import axios, { isAxiosError } from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://127.0.0.1:5000";

export const loginUser = async (email: string, password: string) => {
  if (!email || !password) {
    alert("Email and password are required to log in.");
    return;
  }

  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    const { access_token, refresh_token, user } = response.data;

    await SecureStore.setItemAsync("access_token", access_token);
    await SecureStore.setItemAsync("refresh_token", refresh_token);

    return user;
  } catch (error: unknown) {
    if (!isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      throw new Error(message);
    } else {
      throw new Error("Network error. Check your connection and try again.");
    }
  }
};
