import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosJSON } from "../axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserDetails } from "./get-user-details";
import { registerForPushNotificationsAsync } from "@/config/notification";
import { getAccounts, getBanks, getTransactions } from "./bank";

interface LoginError {
  message: string;
}

interface LoginState {
  loading: boolean;
}

const axios = AxiosJSON();

export const loginUser = createAsyncThunk(
  "auth/loginAsync",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(loginRequest());

      const pushToken = await registerForPushNotificationsAsync();

      const loginData: any = {
        email,
        password,
      };

      if (pushToken) {
        loginData.pushToken = pushToken;
      }

      const { data } = await axios.post("login", loginData);

      await AsyncStorage.setItem("token", data?.token);
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);

      await dispatch(
        getUserDetails({
          token: data?.token,
        })
      );

      await dispatch(
        getBanks({
          token: data?.token,
        })
      );

      await dispatch(
        getAccounts({
          token: data?.token,
        })
      );

      await dispatch(
        getTransactions({
          token: data?.token,
        })
      );

      dispatch(loginComplete());

      Toast.show({
        type: "success",
        text1: data.message,
        visibilityTime: 5000,
      });
    } catch (error) {
      console.log("Login Error", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<LoginError>;
      if (axiosError.response && axiosError.response.data) {
        errorMessage = axiosError.response.data.message;
      }

      dispatch(loginComplete());

      Toast.show({
        type: "error",
        text1: errorMessage ?? "Server Error",
        visibilityTime: 5000,
      });

      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: LoginState = {
  loading: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },

    loginComplete: (state) => {
      state.loading = false;
    },
  },
});

export const { loginComplete, loginRequest } = loginSlice.actions;

export default loginSlice;
