import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  const { access_token, refresh_token } = response.data;

  await AsyncStorage.setItem("access_token", access_token);
  await AsyncStorage.setItem("refresh_token", refresh_token);

  return response.data.user;
};
