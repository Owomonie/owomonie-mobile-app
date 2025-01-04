import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosJSON } from "../axios";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LogOutError {
  message: string;
}

interface LogOutState {
  loading: boolean;
}

const axios = AxiosJSON();

export const logOut = createAsyncThunk(
  "auth/logOutAsync",
  async (_cre, { dispatch, rejectWithValue }) => {
    try {
      dispatch(logOutRequest());
      const token = await AsyncStorage.getItem("token");

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.get("logout");

      dispatch(logOutComplete());

      router.push("/(auth)/(login)/(auth)");

      Toast.show({
        type: "success",
        text1: data.message,
        visibilityTime: 5000,
      });
    } catch (error) {
      console.log("logOut Error", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<LogOutError>;
      if (axiosError.response) {
        if (axiosError.response.status === 403) {
          // Handle 403 Forbidden error
          // @ts-ignore
          router.push("/(auth)/(login)/(auth)"); // Redirect to login
          errorMessage = "Access denied. Please log in again.";
        } else if (axiosError.response.data) {
          // Handle other errors
          errorMessage = axiosError.response.data.message;
        }
      }

      dispatch(logOutComplete());
      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 5000,
      });

      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: LogOutState = {
  loading: false,
};

const logOutSlice = createSlice({
  name: "logOut",
  initialState,
  reducers: {
    logOutRequest: (state) => {
      state.loading = true;
    },

    logOutComplete: (state) => {
      state.loading = false;
    },
  },
});

export const { logOutComplete, logOutRequest } = logOutSlice.actions;

export default logOutSlice;
